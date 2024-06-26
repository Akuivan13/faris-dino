import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.removeEventListener("touchstart", onTouchStart)
  document.addEventListener("keydown", onJump)
  document.addEventListener("touchstart", onTouchStart)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
  dinoElem.src = "https://telegra.ph/file/762b2ace5b1aa0e3371af.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `https://telegra.ph/file/4d875ec346a403b9f7435.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `https://telegra.ph/file/4d875ec346a403b9f7435.png-${dinoFrame}`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if ((e.code !== "Space" && e.type !== "touchstart") || isJumping) return

  jumpDino()
}

function onTouchStart(e) {
  if (isJumping) return

  jumpDino()
}

function jumpDino() {
  yVelocity = JUMP_SPEED
  isJumping = true
}