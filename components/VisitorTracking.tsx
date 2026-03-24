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
    hasTracked.current = true;

    if (document.getElementById('device-detector-script')) {
      initVisitorTracking();
      return;
    }

    if (typeof window.DeviceDetector !== 'undefined') {
      initVisitorTracking();
      return;
    }

    const script = document.createElement('script');
    script.id = 'device-detector-script';
    script.src = 'https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/dist/device-detector.min.js';
    script.async = true;
    
    script.onload = () => {
      setTimeout(() => {
        initVisitorTracking();
      }, 100);
    };
    
    script.onerror = () => {
      try {
        initVisitorTrackingFallback();
      } catch (e) {
      }
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('device-detector-script');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
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
    const ipv4 = ips.find(i => isIPv4(i));
    return ipv4 || null;
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
      deviceModel = 'iPad';
      if (ua.includes('iPad Pro')) deviceModel = 'iPad Pro';
      else if (ua.includes('iPad Air')) deviceModel = 'iPad Air';
      else if (ua.includes('iPad Mini')) deviceModel = 'iPad Mini';
    } else if (ua.includes('Android')) {
      const androidMatch = ua.match(/Android.*?;\s*([^)]+)\)/i);
      if (androidMatch) {
        const deviceInfo = androidMatch[1].trim();
        if (deviceInfo.includes('Samsung')) {
          deviceBrand = 'Samsung';
          if (deviceInfo.includes('Galaxy S')) deviceModel = deviceInfo.match(/Galaxy S[^)]*/)?.[0] || 'Galaxy S';
          else if (deviceInfo.includes('Galaxy Note')) deviceModel = deviceInfo.match(/Galaxy Note[^)]*/)?.[0] || 'Galaxy Note';
          else if (deviceInfo.includes('Galaxy A')) deviceModel = deviceInfo.match(/Galaxy A[^)]*/)?.[0] || 'Galaxy A';
          else deviceModel = deviceInfo;
        } else if (deviceInfo.includes('Pixel')) {
          deviceBrand = 'Google';
          deviceModel = deviceInfo.match(/Pixel[^)]*/)?.[0] || 'Pixel';
        } else if (deviceInfo.includes('OnePlus')) {
          deviceBrand = 'OnePlus';
          deviceModel = deviceInfo.match(/OnePlus[^)]*/)?.[0] || 'OnePlus';
        } else if (deviceInfo.includes('Xiaomi')) {
          deviceBrand = 'Xiaomi';
          deviceModel = deviceInfo.match(/Xiaomi[^)]*/)?.[0] || 'Xiaomi';
        } else if (deviceInfo.includes('Huawei')) {
          deviceBrand = 'Huawei';
          deviceModel = deviceInfo.match(/Huawei[^)]*/)?.[0] || 'Huawei';
        } else if (deviceInfo.includes('OPPO')) {
          deviceBrand = 'OPPO';
          deviceModel = deviceInfo;
        } else if (deviceInfo.includes('Vivo')) {
          deviceBrand = 'Vivo';
          deviceModel = deviceInfo;
        } else if (deviceInfo.includes('Realme')) {
          deviceBrand = 'Realme';
          deviceModel = deviceInfo;
        } else {
          const parts = deviceInfo.split(/\s+/);
          if (parts.length > 0) {
            deviceBrand = parts[0];
            deviceModel = deviceInfo;
          }
        }
      }
    } else if (ua.includes('Macintosh') || ua.includes('Mac OS')) {
      deviceBrand = 'Apple';
      if (ua.includes('MacBook Pro')) deviceModel = 'MacBook Pro';
      else if (ua.includes('MacBook Air')) deviceModel = 'MacBook Air';
      else if (ua.includes('iMac')) deviceModel = 'iMac';
      else if (ua.includes('MacBook')) deviceModel = 'MacBook';
      else deviceModel = 'Mac';
    } else if (ua.includes('Windows')) {
      deviceBrand = 'PC';
      deviceModel = 'Windows PC';
    } else if (ua.includes('Linux')) {
      deviceBrand = 'PC';
      deviceModel = 'Linux PC';
    }
    
    return { deviceBrand, deviceModel };
  };

  const initVisitorTrackingFallback = () => {
    if (typeof window === 'undefined') return;

    try {
      const ua = navigator.userAgent;
      const screenSize = `${window.innerWidth}x${window.innerHeight}`;
      const { deviceBrand, deviceModel } = detectDeviceFromUA(ua);
      
      let os = 'Unknown';
      if (ua.includes('Windows')) os = 'Windows';
      else if (ua.includes('Mac')) os = 'Mac OS';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

      let browser = 'Unknown';
      if (ua.includes('Chrome')) browser = 'Chrome';
      else if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Safari')) browser = 'Safari';
      else if (ua.includes('Edge')) browser = 'Edge';

      Promise.allSettled([
        fetch("https://ipapi.co/json/").then(r => r.json()),
        fetch("https://ipinfo.io/json?token=4dbd09d944c7db").then(r => r.json()),
        fetch("https://ip-api.com/json/").then(r => r.json()),
        fetch("https://api.ipify.org?format=json").then(r => r.json()),
        fetch("https://api64.ipify.org?format=json").then(r => r.json())
      ]).then(results => {
        let data: any = null;
        let coordinates: any = null;
        let ipv4Address: string | null = null;
        
        const allIpv4s = [];
        if (results[0].status === 'fulfilled' && results[0].value && !results[0].value.error) {
          const ipv4 = extractIPv4(results[0].value.ip || results[0].value.query);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 0 });
        }
        if (results[1].status === 'fulfilled' && results[1].value) {
          const ipv4 = extractIPv4(results[1].value.ip);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 1 });
        }
        if (results[2].status === 'fulfilled' && results[2].value && results[2].value.status === 'success') {
          const ipv4 = extractIPv4(results[2].value.query);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 2 });
        }
        if (results[3].status === 'fulfilled' && results[3].value && results[3].value.ip) {
          const ipv4 = extractIPv4(results[3].value.ip);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 3 });
        }
        if (results[4].status === 'fulfilled' && results[4].value && results[4].value.ip) {
          const ipv4 = extractIPv4(results[4].value.ip);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 4 });
        }
        
        if (allIpv4s.length > 0) {
          ipv4Address = allIpv4s[0].ip;
        } else {
          fetch("https://api.ipify.org?format=json")
            .then(r => r.json())
            .then(ipData => {
              const ipv4 = extractIPv4(ipData.ip);
              if (ipv4) ipv4Address = ipv4;
            })
            .catch(() => {});
        }
        
        if (results[0].status === 'fulfilled' && results[0].value && !results[0].value.error) {
          const ipapi = results[0].value;
          if (ipapi.latitude && ipapi.longitude) {
            data = {
              ip: ipv4Address || "Unknown",
              city: ipapi.city,
              region: ipapi.region || ipapi.region_code,
              country: ipapi.country_name || ipapi.country,
              postal: ipapi.postal,
              timezone: ipapi.timezone,
              org: ipapi.org,
              loc: `${ipapi.latitude},${ipapi.longitude}`
            };
            coordinates = { lat: ipapi.latitude, lng: ipapi.longitude };
          }
        }
        
        if (!data && results[1].status === 'fulfilled' && results[1].value) {
          const ipinfo = results[1].value;
          if (ipinfo.loc) {
            const [lat, lng] = ipinfo.loc.split(',');
            data = {
              ip: ipv4Address || "Unknown",
              city: ipinfo.city,
              region: ipinfo.region,
              country: ipinfo.country,
              postal: ipinfo.postal,
              timezone: ipinfo.timezone,
              org: ipinfo.org,
              loc: ipinfo.loc
            };
            coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
          }
        }
        
        if (!data && results[2].status === 'fulfilled' && results[2].value && results[2].value.status === 'success') {
          const ipapi = results[2].value;
          if (ipapi.lat && ipapi.lon) {
            data = {
              ip: ipv4Address || "Unknown",
              city: ipapi.city,
              region: ipapi.regionName,
              country: ipapi.country,
              postal: ipapi.zip,
              timezone: ipapi.timezone,
              org: ipapi.isp,
              loc: `${ipapi.lat},${ipapi.lon}`
            };
            coordinates = { lat: ipapi.lat, lng: ipapi.lon };
          }
        }
        
        if (!data) {
          data = {
            ip: "Unknown",
            city: "Unknown",
            region: "Unknown",
            country: "Unknown",
            postal: "Unknown",
            timezone: "Unknown",
            org: "Unavailable",
            loc: null
          };
        }
        
        const mapLink = coordinates 
          ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15`
          : (data.loc ? `https://www.google.com/maps?q=${data.loc}` : "Unavailable");
        
        // Advanced info gathering
        const nav: any = navigator;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

          const visitorData = {
            ip: data.ip || "Unknown",
            city: data.city || "Unknown",
            region: data.region || "Unknown",
            country: data.country || "Unknown",
            postalcode: data.postal || "Unknown",
            timezone: data.timezone || "Unknown",
            maplink: mapLink,
            isp: data.org || "Unavailable",
            deviceBrand: deviceBrand,
            deviceModel: deviceModel,
            os: os,
            browser: browser,
            screenSize: screenSize,
            deviceType: /Mobile|Android|iPhone|iPad/.test(ua) ? "Mobile" : "Desktop",
            referrer: document.referrer || "Direct",
            pageVisited: window.location.pathname,
            timestamp: new Date().toLocaleString(),
            // Advanced Details
            language: navigator.language || "Unknown",
            connection: connection ? connection.effectiveType : "Unknown",
            cpuCores: navigator.hardwareConcurrency || "Unknown",
            deviceMemory: nav.deviceMemory || "Unknown",
            colorDepth: screen.colorDepth || "Unknown",
            pixelRatio: window.devicePixelRatio || "Unknown",
            urlParameters: window.location.search || "None",
            fullUserAgent: navigator.userAgent || "Unknown",
            localTime: new Date().toString(),
            platform: nav.platform || "Unknown"
          };

          fetch("/api/visitor-tracking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(visitorData)
          }).catch(() => {});
        }).catch(() => {});
    } catch (error) {}
  };

  const initVisitorTracking = () => {
    if (typeof window === 'undefined') return;
    
    if (typeof window.DeviceDetector === 'undefined') {
      let attempts = 0;
      const maxAttempts = 10;
      const checkDeviceDetector = () => {
        attempts++;
        if (typeof window.DeviceDetector !== 'undefined') {
          initVisitorTracking();
        } else if (attempts < maxAttempts) {
          setTimeout(checkDeviceDetector, 50);
        } else {
          initVisitorTrackingFallback();
        }
      };
      setTimeout(checkDeviceDetector, 50);
      return;
    }

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

      Promise.allSettled([
        fetch("https://ipapi.co/json/").then(r => r.json()),
        fetch("https://ipinfo.io/json?token=4dbd09d944c7db").then(r => r.json()),
        fetch("https://ip-api.com/json/").then(r => r.json()),
        fetch("https://api.ipify.org?format=json").then(r => r.json()),
        fetch("https://api64.ipify.org?format=json").then(r => r.json())
      ]).then(results => {
        let data: any = null;
        let coordinates: any = null;
        let ipv4Address: string | null = null;
        
        const allIpv4s = [];
        if (results[0].status === 'fulfilled' && results[0].value && !results[0].value.error) {
          const ipv4 = extractIPv4(results[0].value.ip || results[0].value.query);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 0 });
        }
        if (results[1].status === 'fulfilled' && results[1].value) {
          const ipv4 = extractIPv4(results[1].value.ip);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 1 });
        }
        if (results[2].status === 'fulfilled' && results[2].value && results[2].value.status === 'success') {
          const ipv4 = extractIPv4(results[2].value.query);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 2 });
        }
        if (results[3].status === 'fulfilled' && results[3].value && results[3].value.ip) {
          const ipv4 = extractIPv4(results[3].value.ip);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 3 });
        }
        if (results[4].status === 'fulfilled' && results[4].value && results[4].value.ip) {
          const ipv4 = extractIPv4(results[4].value.ip);
          if (ipv4) allIpv4s.push({ ip: ipv4, source: 4 });
        }
        
        if (allIpv4s.length > 0) {
          ipv4Address = allIpv4s[0].ip;
        } else {
          fetch("https://api.ipify.org?format=json")
            .then(r => r.json())
            .then(ipData => {
              const ipv4 = extractIPv4(ipData.ip);
              if (ipv4) ipv4Address = ipv4;
            })
            .catch(() => {});
        }
        
        if (results[0].status === 'fulfilled' && results[0].value && !results[0].value.error) {
          const ipapi = results[0].value;
          if (ipapi.latitude && ipapi.longitude) {
            data = {
              ip: ipv4Address || "Unknown",
              city: ipapi.city,
              region: ipapi.region || ipapi.region_code,
              country: ipapi.country_name || ipapi.country,
              postal: ipapi.postal,
              timezone: ipapi.timezone,
              org: ipapi.org,
              loc: `${ipapi.latitude},${ipapi.longitude}`
            };
            coordinates = { lat: ipapi.latitude, lng: ipapi.longitude };
          }
        }
        
        if (!data && results[1].status === 'fulfilled' && results[1].value) {
          const ipinfo = results[1].value;
          if (ipinfo.loc) {
            const [lat, lng] = ipinfo.loc.split(',');
            data = {
              ip: ipv4Address || "Unknown",
              city: ipinfo.city,
              region: ipinfo.region,
              country: ipinfo.country,
              postal: ipinfo.postal,
              timezone: ipinfo.timezone,
              org: ipinfo.org,
              loc: ipinfo.loc
            };
            coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
          }
        }
        
        if (!data && results[2].status === 'fulfilled' && results[2].value && results[2].value.status === 'success') {
          const ipapi = results[2].value;
          if (ipapi.lat && ipapi.lon) {
            data = {
              ip: ipv4Address || "Unknown",
              city: ipapi.city,
              region: ipapi.regionName,
              country: ipapi.country,
              postal: ipapi.zip,
              timezone: ipapi.timezone,
              org: ipapi.isp,
              loc: `${ipapi.lat},${ipapi.lon}`
            };
            coordinates = { lat: ipapi.lat, lng: ipapi.lon };
          }
        }
        
        if (!data) {
          data = {
            ip: "Unknown",
            city: "Unknown",
            region: "Unknown",
            country: "Unknown",
            postal: "Unknown",
            timezone: "Unknown",
            org: "Unavailable",
            loc: null
          };
        }
        
        const os = `${result.os?.name || "Unknown"} ${result.os?.version || ""}`;
        const browser = `${result.client?.name || "Unknown"} ${result.client?.version || ""}`;
        const screenSize = `${window.innerWidth}x${window.innerHeight}`;
        const deviceType = result.device?.type || "Unknown";
        const isp = data.org || "Unavailable";
        
        const mapLink = coordinates 
          ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15`
          : (data.loc ? `https://www.google.com/maps?q=${data.loc}` : "Unavailable");

        // Advanced info gathering
        const nav: any = navigator;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

        const visitorData = {
          ip: data.ip || "Unknown",
          city: data.city || "Unknown",
          region: data.region || "Unknown",
          country: data.country || "Unknown",
          postalcode: data.postal || "Unknown",
          timezone: data.timezone || "Unknown",
          maplink: mapLink,
          isp: isp,
          deviceBrand: deviceBrand,
          deviceModel: deviceModel,
          os: os,
          browser: browser,
          screenSize: screenSize,
          deviceType: deviceType,
          referrer: document.referrer || "Direct",
          pageVisited: window.location.pathname,
          timestamp: new Date().toLocaleString(),
          // Advanced Details
          language: navigator.language || "Unknown",
          connection: connection ? connection.effectiveType : "Unknown",
          cpuCores: navigator.hardwareConcurrency || "Unknown",
          deviceMemory: nav.deviceMemory || "Unknown",
          colorDepth: screen.colorDepth || "Unknown",
          pixelRatio: window.devicePixelRatio || "Unknown",
          urlParameters: window.location.search || "None",
          fullUserAgent: navigator.userAgent || "Unknown",
          localTime: new Date().toString(),
          platform: nav.platform || "Unknown"
        };

        if (process.env.NODE_ENV === 'development') {
          console.log("📤 Sending visitor data:", visitorData);
        }

        fetch("/api/visitor-tracking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(visitorData)
        }).catch(() => {});
      }).catch(() => {});
    } catch (error) {
      initVisitorTrackingFallback();
    }
  };

  return null;
}
