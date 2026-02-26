import { useEffect, useRef } from 'react'
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'

function debounce(func, wait) {
  let timeout
  return function debounced(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t
}

function wrapText(context, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let currentLine = words[0] || ''

  for (let i = 1; i < words.length; i += 1) {
    const word = words[i]
    const testLine = `${currentLine} ${word}`
    if (context.measureText(testLine).width <= maxWidth) {
      currentLine = testLine
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }

  lines.push(currentLine)
  return lines
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function iconForTitle(title) {
  const normalized = (title || '').toLowerCase()
  if (normalized.includes('audio')) return 'm'
  if (normalized.includes('video')) return 'v'
  if (normalized.includes('image')) return 'i'
  return 't'
}

function createCardTexture(gl, image, title, description) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 1200
  canvas.height = 1350

  const cardWidth = canvas.width
  const cardHeight = canvas.height
  const cardRadius = 56
  const imageX = 80
  const imageY = 72
  const imageW = cardWidth - 160
  const imageH = 620

  ctx.clearRect(0, 0, cardWidth, cardHeight)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  ctx.save()
  roundedRect(ctx, 2, 2, cardWidth - 4, cardHeight - 4, cardRadius)
  ctx.fillStyle = '#f7f8f7'
  ctx.fill()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#bdd8ce'
  ctx.stroke()

  ctx.save()
  roundedRect(ctx, imageX, imageY, imageW, imageH, 42)
  ctx.clip()
  const imageAspect = image.naturalWidth / image.naturalHeight
  const boxAspect = imageW / imageH
  let sx = 0
  let sy = 0
  let sw = image.naturalWidth
  let sh = image.naturalHeight
  if (imageAspect > boxAspect) {
    sw = Math.round(image.naturalHeight * boxAspect)
    sx = Math.round((image.naturalWidth - sw) / 2)
  } else {
    sh = Math.round(image.naturalWidth / boxAspect)
    sy = Math.round((image.naturalHeight - sh) / 2)
  }
  ctx.drawImage(image, sx, sy, sw, sh, imageX, imageY, imageW, imageH)
  const gradient = ctx.createLinearGradient(0, imageY + imageH * 0.35, 0, imageY + imageH)
  gradient.addColorStop(0, 'rgba(4, 98, 65, 0.02)')
  gradient.addColorStop(1, 'rgba(4, 98, 65, 0.62)')
  ctx.fillStyle = gradient
  ctx.fillRect(imageX, imageY, imageW, imageH)
  ctx.restore()

  const badgeSize = 136
  const badgeX = imageX + 16
  const badgeY = imageY + imageH - badgeSize - 16
  roundedRect(ctx, badgeX, badgeY, badgeSize, badgeSize, 34)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.strokeStyle = '#d4e5dd'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = '#046241'
  ctx.font = '700 74px Manrope, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(iconForTitle(title), badgeX + badgeSize / 2, badgeY + badgeSize / 2 + 2)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = '#111111'
  ctx.font = '700 70px Manrope, sans-serif'
  ctx.fillText(`${title} Data Services`, 82, imageY + imageH + 150)

  ctx.font = '500 50px Manrope, sans-serif'
  const lines = wrapText(ctx, description, cardWidth - 164)
  let y = imageY + imageH + 245
  lines.slice(0, 4).forEach((line) => {
    ctx.fillText(line, 82, y)
    y += 68
  })

  roundedRect(ctx, 82, cardHeight - 120, 142, 14, 7)
  ctx.fillStyle = '#f5b045'
  ctx.fill()
  ctx.restore()

  const texture = new Texture(gl, { generateMipmaps: true })
  texture.image = canvas

  return { texture, width: canvas.width, height: canvas.height }
}

function createPlaceholderTexture(gl, title, description) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 1200
  canvas.height = 1350

  const cardWidth = canvas.width
  const cardHeight = canvas.height
  const cardRadius = 56
  const imageX = 80
  const imageY = 72
  const imageW = cardWidth - 160
  const imageH = 620

  ctx.clearRect(0, 0, cardWidth, cardHeight)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  roundedRect(ctx, 2, 2, cardWidth - 4, cardHeight - 4, cardRadius)
  ctx.fillStyle = '#f7f8f7'
  ctx.fill()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#bdd8ce'
  ctx.stroke()

  roundedRect(ctx, imageX, imageY, imageW, imageH, 42)
  const heroGradient = ctx.createLinearGradient(imageX, imageY, imageX + imageW, imageY + imageH)
  heroGradient.addColorStop(0, '#0d3f2d')
  heroGradient.addColorStop(1, '#046241')
  ctx.fillStyle = heroGradient
  ctx.fill()

  const badgeSize = 136
  const badgeX = imageX + 16
  const badgeY = imageY + imageH - badgeSize - 16
  roundedRect(ctx, badgeX, badgeY, badgeSize, badgeSize, 34)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.strokeStyle = '#d4e5dd'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = '#046241'
  ctx.font = '700 74px Manrope, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(iconForTitle(title), badgeX + badgeSize / 2, badgeY + badgeSize / 2 + 2)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = '#111111'
  ctx.font = '700 70px Manrope, sans-serif'
  ctx.fillText(`${title} Data Services`, 82, imageY + imageH + 150)

  ctx.font = '500 50px Manrope, sans-serif'
  const lines = wrapText(ctx, description, cardWidth - 164)
  let y = imageY + imageH + 245
  lines.slice(0, 4).forEach((line) => {
    ctx.fillText(line, 82, y)
    y += 68
  })

  roundedRect(ctx, 82, cardHeight - 120, 142, 14, 7)
  ctx.fillStyle = '#f5b045'
  ctx.fill()

  const texture = new Texture(gl, { generateMipmaps: true })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    description,
    viewport,
    bend,
    borderRadius = 0,
  }) {
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.scene = scene
    this.screen = screen
    this.text = text
    this.description = description
    this.viewport = viewport
    this.bend = bend
    this.borderRadius = borderRadius

    this.createShader()
    this.createMesh()
    this.onResize()
  }

  createShader() {
    this.texture = new Texture(this.gl, { generateMipmaps: true })
    const placeholder = createPlaceholderTexture(this.gl, this.text, this.description)
    this.texture.image = placeholder.texture.image

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;

        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;

        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );

          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          vec4 color = texture2D(tMap, uv);

          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: this.texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [placeholder.width, placeholder.height] },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    })

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = this.image
    img.onload = () => {
      const { texture, width, height } = createCardTexture(this.gl, img, this.text, this.description)
      this.texture.image = texture.image
      this.program.uniforms.uImageSizes.value = [width, height]
    }
    img.onerror = () => {
      const fallback = createPlaceholderTexture(this.gl, this.text, this.description)
      this.texture.image = fallback.texture.image
      this.program.uniforms.uImageSizes.value = [fallback.width, fallback.height]
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })
    this.plane.setParent(this.scene)
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra

    const x = this.plane.position.x
    const halfView = this.viewport.width / 2

    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const bendAbs = Math.abs(this.bend)
      const radius = (halfView * halfView + bendAbs * bendAbs) / (2 * bendAbs)
      const effectiveX = Math.min(Math.abs(x), halfView)
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX)

      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / radius)
      }
    }

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }

    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) this.viewport = viewport

    this.scale = this.screen.height / 1450
    this.plane.scale.y = (this.viewport.height * (980 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (760 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]

    this.padding = 1.8
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

class GalleryApp {
  constructor(
    container,
    {
      items,
      bend,
      borderRadius = 0,
      scrollSpeed = 2,
      scrollEase = 0.05,
    } = {},
  ) {
    this.container = container
    this.items = items
    this.scrollSpeed = scrollSpeed
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck, 200)

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(this.items, bend, borderRadius)
    this.update()
    this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    })

    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    })
  }

  createMedias(items, bend = 1, borderRadius = 0) {
    const galleryItems = items && items.length ? items : []
    this.mediasImages = galleryItems.concat(galleryItems)

    this.medias = this.mediasImages.map((data, index) => new Media({
      geometry: this.planeGeometry,
      gl: this.gl,
      image: data.image,
      index,
      length: this.mediasImages.length,
      scene: this.scene,
      screen: this.screen,
      text: data.text,
      description: data.description || '',
      viewport: this.viewport,
      bend,
      borderRadius,
    }))
  }

  onTouchDown(e) {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = e.touches ? e.touches[0].clientX : e.clientX
  }

  onTouchMove(e) {
    if (!this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * (this.scrollSpeed * 0.025)
    this.scroll.target = this.scroll.position + distance
  }

  onTouchUp() {
    this.isDown = false
    this.onCheck()
  }

  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2
    this.onCheckDebounce()
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    }

    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })

    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }

    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }))
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'

    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }

    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)

    window.addEventListener('resize', this.boundOnResize)
    this.container.addEventListener('wheel', this.boundOnWheel, { passive: true })
    this.container.addEventListener('mousedown', this.boundOnTouchDown)
    window.addEventListener('mousemove', this.boundOnTouchMove)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true })
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true })
    window.addEventListener('touchend', this.boundOnTouchUp)
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    this.container.removeEventListener('wheel', this.boundOnWheel)
    this.container.removeEventListener('mousedown', this.boundOnTouchDown)
    window.removeEventListener('mousemove', this.boundOnTouchMove)
    window.removeEventListener('mouseup', this.boundOnTouchUp)
    this.container.removeEventListener('touchstart', this.boundOnTouchDown)
    window.removeEventListener('touchmove', this.boundOnTouchMove)
    window.removeEventListener('touchend', this.boundOnTouchUp)

    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

export default function CircularGallery({
  items,
  bend = 0,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !items?.length) return undefined

    const app = new GalleryApp(containerRef.current, {
      items,
      bend,
      borderRadius,
      scrollSpeed,
      scrollEase,
    })

    return () => app.destroy()
  }, [items, bend, borderRadius, scrollSpeed, scrollEase])

  return <div className="circular-gallery w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />
}
