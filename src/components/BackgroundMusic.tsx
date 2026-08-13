import { useEffect, useRef, useState } from 'react'

const AUDIO_SRC = ''
const DEFAULT_VOLUME = 0.14

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M8 6.5v11l9-5.5-9-5.5Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M7 6.5h3v11H7zM14 6.5h3v11h-3z" />
    </svg>
  )
}

function MusicNoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M16 4.5v10.1a2.9 2.9 0 1 1-1.4-2.5V7.6l-6 1.5v7a2.9 2.9 0 1 1-1.4-2.5V6.8L16 4.5Z" />
    </svg>
  )
}

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const currentAudio = audioRef.current

    if (!currentAudio) {
      return
    }

    const audio = currentAudio

    audio.volume = DEFAULT_VOLUME

    async function tryAutoplay(audio: HTMLAudioElement) {
      try {
        await audio.play()
        setIsPlaying(true)
        setHasError(false)
        return true
      } catch {
        setIsPlaying(false)
        return false
      }
    }

    function cleanupInteractionListeners() {
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }

    async function handleFirstInteraction() {
      const didPlay = await tryAutoplay(audio)

      if (didPlay) {
        cleanupInteractionListeners()
      }
    }

    void tryAutoplay(audio).then((didPlay) => {
      if (!didPlay) {
        window.addEventListener('pointerdown', handleFirstInteraction, { passive: true })
        window.addEventListener('keydown', handleFirstInteraction)
        window.addEventListener('touchstart', handleFirstInteraction, { passive: true })
      }
    })

    return () => {
      cleanupInteractionListeners()
    }
  }, [])

  async function togglePlayback() {
    const audio = audioRef.current

    if (!audio || !isReady) {
      return
    }

    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
        setHasError(false)
      } catch {
        setIsPlaying(false)
      }

      return
    }

    audio.pause()
    setIsPlaying(false)
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        autoPlay
        loop
        preload="auto"
        onCanPlay={() => setIsReady(true)}
        onError={() => setHasError(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        aria-label={
          hasError
            ? 'Archivo de musica no disponible'
            : isPlaying
              ? 'Pausar musica'
              : 'Reproducir musica'
        }
        className="fixed bottom-3 left-3 z-50 inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[rgba(232,160,180,0.72)] bg-[linear-gradient(180deg,rgba(255,253,252,0.72),rgba(254,246,240,0.58))] px-2.5 py-1.5 text-[var(--color-strawberry)] shadow-[0_10px_22px_rgba(180,126,120,0.14),inset_0_0_0_2px_rgba(255,250,251,0.92),inset_0_10px_22px_rgba(255,255,255,0.3)] backdrop-blur-[20px] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => void togglePlayback()}
        disabled={!isReady || hasError}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(232,160,180,0.56)] bg-[rgba(249,213,229,0.3)] text-[var(--color-strawberry)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.92),inset_0_8px_14px_rgba(255,255,255,0.28)]">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
        <span className="inline-flex items-center gap-1.5 font-serif text-[0.82rem] font-semibold leading-none">
          <span className="text-[var(--color-strawberry)]">
            <MusicNoteIcon />
          </span>
          <span>
            {hasError
              ? 'Musica no disponible'
              : isPlaying
                ? 'Pausar musica'
                : 'Reproducir musica'}
          </span>
        </span>
      </button>
    </>
  )
}
