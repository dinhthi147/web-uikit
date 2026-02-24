// import MicRecorder from 'mic-recorder-to-mp3';
// import { useState } from 'react';
// import { toast } from 'react-toastify';

// const useRecord = (handleUploadAudio: (blob: Blob) => void) => {
//   const [isRecording, setIsRecording] = useState(false);

//   const [Mp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));

//   const checkBlockedAudio = (cb: () => void) => {
//     if (navigator.mediaDevices?.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ audio: true })
//         .then(() => cb())
//         .catch(e => {
//           toast.error(
//             'You will need to manually turn on Microphone service later on this browser'
//           );
//         });
//     } else {
//       toast.error('This browser is not supported Microphone service');
//     }
//   };

//   const start = () => {
//     checkBlockedAudio(() =>
//       Mp3Recorder.start()
//         .then(() => {
//           setIsRecording(true);
//         })
//         .catch((e: any) => {
//           console.error(e);
//           toast.error('Something went wrong. Please contact us');
//         })
//     );
//   };

//   const stop = () => {
//     Mp3Recorder.stop()
//       .getMp3()
//       .then(([_, blob]) => {
//         setIsRecording(false);
//         handleUploadAudio(blob);
//       })
//       .catch((e: any) => {
//         console.error(e);
//         toast.error('Something went wrong. Please contact us');
//       });
//   };

//   return [isRecording, start, stop];
// };

// export default useRecord;
