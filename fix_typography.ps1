function Fix-Responsive {
    param($Path, $Pattern, $Replacement)
    $Content = Get-Content -Path $Path -Raw
    if ($Content -match $Pattern) {
        $Content = $Content -replace $Pattern, $Replacement
        Set-Content -Path $Path -Value $Content
    }
}

$files = Get-ChildItem -Path d:\DelphinAssociates\components, d:\DelphinAssociates\app -Recurse -Filter *.tsx

foreach ($file in $files) {
    # Replace global height bounds for Safari URL bar compat
    Fix-Responsive $file.FullName "\bmin-h-screen\b" "min-h-[100dvh]"
    Fix-Responsive $file.FullName "\bh-screen\b" "h-[100dvh]"

    # Hero elements and major headers -> Scale down base font sizes for ultra-mobile (<400px)
    Fix-Responsive $file.FullName "text-5xl sm:text-6xl md:text-7xl lg:text-8xl" "text-4xl sm:text-5xl md:text-6xl lg:text-8xl"
    Fix-Responsive $file.FullName "text-4xl sm:text-5xl lg:text-6xl" "text-3xl sm:text-4xl lg:text-6xl"
    Fix-Responsive $file.FullName "text-3xl sm:text-5xl md:text-6xl lg:text-7xl" "text-3xl sm:text-4xl md:text-5xl lg:text-7xl"
    Fix-Responsive $file.FullName "text-3xl sm:text-5xl md:text-6xl" "text-[28px] sm:text-4xl md:text-5xl lg:text-6xl"
    
    # Large headers in "About" and "Projects"
    Fix-Responsive $file.FullName "text-3xl sm:text-4xl md:text-5xl lg:text-7xl" "text-[28px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl"
    Fix-Responsive $file.FullName "text-2xl sm:text-4xl md:text-5xl" "text-[26px] sm:text-3xl md:text-4xl lg:text-5xl"
}
