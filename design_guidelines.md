# Design Guidelines: A Year in Boarding Passes

## Design Approach
**Reference-Based**: Drawing inspiration from Apple Photos (nostalgic presentation), Pinterest (masonry grids), and Instagram Stories archive (memory boxes). This is an emotion-first, experience-driven design prioritizing warmth and intimacy over utility.

## Layout Strategy

**No Hero Section**: Dive immediately into the experience with a centered title treatment and boarding pass grid below. This creates instant engagement with the memories rather than building up to them.

**Primary Layout**:
- Container: max-w-7xl with px-6 md:px-12 lg:px-16
- Title section: Centered, generous top padding (pt-16 md:pt-24), bottom padding pb-12 md:pb-16
- Boarding pass grid: Masonry-style grid with 1 column mobile, 2 tablet, 3-4 desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- Grid gap: gap-6 md:gap-8 lg:gap-10 (generous breathing room)

**Spacing System**: Use Tailwind units of 4, 6, 8, 10, 12, 16, 24 for consistent rhythm

## Typography

**Title/Headers**: 
- Main title: text-4xl md:text-5xl lg:text-6xl, font-light, tracking-tight
- Boarding pass text: Inter or IBM Plex Mono, text-sm to text-base, font-medium, tracking-wide for flight codes

**Memory Captions**: 
- DM Sans or Nunito (rounded, friendly), text-base md:text-lg, font-normal, leading-relaxed

## Component Library

### Boarding Pass Cards
- Aspect ratio: Maintain airline boarding pass proportions (~2.5:1 wide rectangles)
- Background: Cream/off-white with subtle texture gradient
- Shadow: Soft multi-layer shadows (shadow-md base, larger shadow-xl on hover)
- Rounded corners: rounded-lg to rounded-xl
- Padding: p-6 md:p-8 internally
- No borders - rely entirely on shadows for depth
- Include authentic boarding pass elements: barcode placeholder, flight number, departure/arrival codes, date, gate

### Memory Reveal Modal
- Full-screen overlay with backdrop blur (backdrop-blur-md)
- Centered card: max-w-4xl with rounded-2xl
- Photo display: Large image at top, 16:9 or 4:3 aspect ratio, rounded-t-2xl
- Caption section: p-8 md:p-12, ample whitespace around text
- Close button: Top-right, subtle with backdrop blur
- Boarding pass mini-preview at bottom showing which memory is active

### Navigation/Header (Minimal)
- Sticky top bar (if needed): Just app title left, minimal padding
- Or completely headerless - let title be part of the main content flow

### Footer
- Centered content: Year summary statistics (e.g., "12 flights • 8 countries • 47,382 miles")
- Personal note or signature
- Minimal social links if desired
- Generous padding: py-16 md:py-24

## Animations & Interactions

**Boarding Pass Cards**:
- Hover: Subtle lift (transform translate-y-1), enhanced shadow, 300ms ease-out
- Click: Slight scale (0.98), 200ms, then expand to modal

**Modal Entry/Exit**:
- Entry: Fade + scale from boarding pass position, 400ms ease-out
- Exit: Reverse animation, 300ms
- Backdrop: Fade in/out 300ms

**Image Loading**: Gentle fade-in for photos, 600ms

**Grid Stagger**: Cards animate in with staggered delays (50-100ms each) on initial load

## Images

**No Hero Image**: This design intentionally skips a traditional hero.

**Memory Photos**: 
- Each boarding pass links to 1-3 photos per trip
- Photos should be personal travel moments: landscapes, cityscapes, candid shots, food, landmarks
- Aspect ratios: Maintain original but crop consistently in modal view (16:9 or 4:3)
- Quality: High-res but optimized for web
- Placement: Revealed in modal overlay when boarding pass is clicked

**Boarding Pass Visuals**:
- May include airline logo placeholders or simple iconography
- Barcode/QR code graphic elements (decorative, not functional)

## Key Design Principles

1. **Scrapbook Authenticity**: Boarding passes look hand-collected, slightly varied in arrangement
2. **Generous Whitespace**: Never cramped - memories need room to breathe
3. **Soft Depth**: Shadows create floating effect, no harsh lines
4. **Warm Intimacy**: Every element reinforces personal, nostalgic feeling
5. **Cinematic Pacing**: Smooth, deliberate animations that don't rush the experience
6. **Content-First**: No chrome or UI clutter - just memories and the passes that represent them