import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';

/**
 * Custom hook for recording audio using the native MediaRecorder API.
 * The output format is typically 'audio/webm' or 'audio/wav', depending on the browser.
 * * @param handleUploadAudio A callback function to handle the recorded Blob (WebM/WAV).
 * @returns A tuple: [isRecording state, start function, stop function]
 */
const useRecord = (
  handleUploadAudio: (blob: Blob) => void
): [boolean, () => void, () => void] => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  /**
   * 1. Checks if the browser supports MediaDevices and requests audio permission.
   */
  const checkBlockedAudio = (cb: () => void) => {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          streamRef.current = stream; // Store the stream for later use (e.g., stopping tracks)
          cb();
        })
        .catch(e => {
          console.error(e);
          toast.error(
            'Microphone access was denied. You will need to manually grant permission.'
          );
        });
    } else {
      toast.error('This browser does not support the Microphone service.');
    }
  };

  /**
   * 2. Starts the audio recording process.
   */
  const start = useCallback(() => {
    // Wrap the start logic inside the permission check
    checkBlockedAudio(() => {
      if (!streamRef.current) return; // Should not happen if checkBlockedAudio succeeded

      try {
        // Initialize MediaRecorder
        mediaRecorderRef.current = new MediaRecorder(streamRef.current);
        audioChunksRef.current = []; // Clear previous chunks

        // Handle data availability (chunks of audio)
        mediaRecorderRef.current.ondataavailable = event => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        // Handle recording stop event
        mediaRecorderRef.current.onstop = () => {
          // Combine all recorded chunks into a single Blob
          const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
          const audioBlob = new Blob(audioChunksRef.current, {
            type: mimeType
          });

          // Clean up the stream tracks (turns off the microphone light)
          streamRef.current?.getTracks().forEach(track => track.stop());
          streamRef.current = null;

          setIsRecording(false);
          handleUploadAudio(audioBlob); // Pass the WebM/WAV blob to the handler
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
        toast.error('Failed to start recording. Please contact us.');
      }
    });
  }, [handleUploadAudio]);

  /**
   * 3. Stops the audio recording process.
   */
  const stop = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop(); // This triggers mediaRecorderRef.current.onstop
    }
  }, []);

  return [isRecording, start, stop];
};

export default useRecord;
