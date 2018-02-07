/* GET ELEMENTS */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.fullScreen')

function togglePlay(){
  /*//paused property lives in video tag
  if (video.paused) {
    //play function is part of video tag
    video.play()
  } else {
    //pause function is part of video tag
    video.pause()
  }*/
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function skip(){
  const amount = this.dataset.skip
  video.currentTime += parseFloat(amount)
}

function handleRateUpdate(){
  video[this.name] = this.value
}

function handleProgress(){
  //currentTime & duration are video tags properties
  const percent = (video.currentTime/video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

function toggleFullScreen(){
  player.classList.toggle('fullscreen')
}

video.addEventListener('click', togglePlay)
//video emmits play & pause event
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
toggle.addEventListener('click', togglePlay)
//video emmits timeupdate event, also progress event
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach( button => {
  button.addEventListener('click', skip)
})

ranges.forEach( range => {
  range.addEventListener('change', handleRateUpdate)
})
ranges.forEach( range => {
  range.addEventListener('mousemove', handleRateUpdate)
})

let mouseDown = false
progress.addEventListener('click', scrub)
// && can be used as short circuit
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

fullScreenButton.addEventListener('click', toggleFullScreen)
