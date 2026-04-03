"use client";

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    DeviceDetector: any;
  }
}

export default function VisitorTracking() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasTracked.current) return;
    
    const initTracking = () => {
      if (typeof window.DeviceDetector !== 'undefined') {
        hasTracked.current = true;
        initVisitorTracking();
      } else {
        // Retry if script hasn't fully parsed yet
        let attempts = 0;
        const maxAttempts = 10;
        const checkDetector = () => {
          attempts++;
          if (typeof window.DeviceDetector !== 'undefined') {
            hasTracked.current = true;
            initVisitorTracking();
          } else if (attempts < maxAttempts) {
            setTimeout(checkDetector, 500);
          } else {
            // Last resort fallback
            hasTracked.current = true;
            initVisitorTrackingFallback();
          }
        };
        setTimeout(checkDetector, 500);
      }
    };

    // Delay a bit to ensure Script component from layout has a chance to execute
    const timeout = setTimeout(initTracking, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const isIPv4 = (ip: string) => {
    if (!ip || typeof ip !== 'string') return false;
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Pattern.test(ip);
  };

  const extractIPv4 = (ip: string) => {
    if (!ip || typeof ip !== 'string') return null;
    if (isIPv4(ip)) return ip;
    const ips = ip.split(',').map(i => i.trim());
    return ips.find(i => isIPv4(i)) || null;
  };

  const detectDeviceFromUA = (ua: string) => {
    let deviceBrand = 'Unknown';
    let deviceModel = 'Unknown';
    
    if (ua.includes('iPhone')) {
      deviceBrand = 'Apple';
      if (ua.includes('iPhone15')) deviceModel = 'iPhone 15';
      else if (ua.includes('iPhone14')) deviceModel = 'iPhone 14';
      else if (ua.includes('iPhone13')) deviceModel = 'iPhone 13';
      else if (ua.includes('iPhone12')) deviceModel = 'iPhone 12';
      else if (ua.includes('iPhone11')) deviceModel = 'iPhone 11';
      else if (ua.includes('iPhone X')) deviceModel = 'iPhone X';
      else deviceModel = 'iPhone';
    } else if (ua.includes('iPad')) {
      deviceBrand = 'Apple';
      deviceModel = ua.includes('iPad Pro') ? 'iPad Pro' : ua.includes('iPad Air') ? 'iPad Air' : ua.includes('iPad Mini') ? 'iPad Mini' : 'iPad';
    } else if (ua.includes('Android')) {
      const androidMatch = ua.match(/Android.*?;\s*([^)]+)\)/i);
      if (androidMatch) {
        const deviceInfo = androidMatch[1].trim();
        if (deviceInfo.includes('Samsung')) {
          deviceBrand = 'Samsung';
          deviceModel = deviceInfo.match(/Galaxy [^)]*/)?.[0] || deviceInfo;
        } else if (deviceInfo.includes('Pixel')) {
          deviceBrand = 'Google';
          deviceModel = deviceInfo.match(/Pixel[^)]*/)?.[0] || 'Pixel';
        } else {
          deviceBrand = deviceInfo.split(/\s+/)[0];
          deviceModel = deviceInfo;
        }
      }
    } else if (ua.includes('Macintosh') || ua.includes('Mac OS')) {
      deviceBrand = 'Apple';
      deviceModel = ua.includes('MacBook Pro') ? 'MacBook Pro' : ua.includes('MacBook Air') ? 'MacBook Air' : ua.includes('iMac') ? 'iMac' : 'Mac';
    } else if (ua.includes('Windows')) {
      deviceBrand = 'PC';
      deviceModel = 'Windows PC';
    }
    
    return { deviceBrand, deviceModel };
  };

  const initVisitorTrackingFallback = () => {
    if (typeof window === 'undefined') return;
    try {
      const ua = navigator.userAgent;
      const { deviceBrand, deviceModel } = detectDeviceFromUA(ua);
      
      let os = ua.includes('Windows') ? 'Windows' : ua.includes('Mac') ? 'Mac OS' : ua.includes('Android') ? 'Android' : ua.includes('iOS') ? 'iOS' : 'Unknown';
      let browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : ua.includes('Edge') ? 'Edge' : 'Unknown';

      fetchTrackingData({ deviceBrand, deviceModel, os, browser, ua });
    } catch (error) {}
  };

  const initVisitorTracking = () => {
    if (typeof window === 'undefined' || typeof window.DeviceDetector === 'undefined') return;
    try {
      const detector = new window.DeviceDetector();
      const result = detector.parse(navigator.userAgent);
      
      let deviceBrand = result.device?.brand || "Unknown";
      let deviceModel = result.device?.model || "Unknown";
      
      if (deviceBrand === "Unknown" || deviceModel === "Unknown") {
        const uaDetection = detectDeviceFromUA(navigator.userAgent);
        if (deviceBrand === "Unknown") deviceBrand = uaDetection.deviceBrand;
        if (deviceModel === "Unknown") deviceModel = uaDetection.deviceModel;
      }

      const os = `${result.os?.name || "Unknown"} ${result.os?.version || ""}`;
      const browser = `${result.client?.name || "Unknown"} ${result.client?.version || ""}`;
      
      fetchTrackingData({ deviceBrand, deviceModel, os, browser, ua: navigator.userAgent });
    } catch (error) {
      initVisitorTrackingFallback();
    }
  };

  const fetchTrackingData = async (baseInfo: any) => {
    try {
      const results = await Promise.allSettled([
        fetch("https://ipapi.co/json/").then(r => r.json()),
        fetch("https://ipinfo.io/json?token=4dbd09d944c7db").then(r => r.json()),
        fetch("https://api.ipify.org?format=json").then(r => r.json())
      ]);

      let ipData: any = {};
      let ipv4Address = "Unknown";

      results.forEach(res => {
        if (res.status === 'fulfilled' && res.value && !res.value.error) {
          const ip = extractIPv4(res.value.ip || res.value.query);
          if (ip) ipv4Address = ip;
          if (res.value.city) ipData = res.value;
        }
      });

      const nav: any = navigator;
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

      const visitorData = {
        ip: ipv4Address,
        city: ipData.city || "Unknown",
        region: ipData.region || ipData.region_code || "Unknown",
        country: ipData.country_name || ipData.country || "Unknown",
        postalcode: ipData.postal || "Unknown",
        timezone: ipData.timezone || "Unknown",
        isp: ipData.org || "Unavailable",
        deviceBrand: baseInfo.deviceBrand,
        deviceModel: baseInfo.deviceModel,
        os: baseInfo.os,
        browser: baseInfo.browser,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        deviceType: /Mobile|Android|iPhone|iPad/.test(baseInfo.ua) ? "Mobile" : "Desktop",
        referrer: document.referrer || "Direct",
        pageVisited: window.location.pathname,
        timestamp: new Date().toLocaleString(),
        language: navigator.language || "Unknown",
        connection: connection ? connection.effectiveType : "Unknown",
        cpuCores: navigator.hardwareConcurrency || "Unknown",
        deviceMemory: nav.deviceMemory || "Unknown",
        fullUserAgent: baseInfo.ua,
        localTime: new Date().toString(),
        platform: nav.platform || "Unknown"
      };

      fetch("/api/visitor-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitorData)
      }).catch(() => {});
    } catch (e) {}
  };

  return null;
}
