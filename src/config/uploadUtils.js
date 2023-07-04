import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

export const handleUpload = async (video, storage, db, setProgress, setUrl) => {
    const storageRef = ref(storage, `videos/${video.name}`);
    const uploadTask = uploadBytesResumable(storageRef, video);
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
        (error) => {
            console.error(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                db.collection("videos").add({url});
                setUrl(url);
            });
        }
    );
    return uploadTask;
};

export const handleUploadAll = async (videos, storage, db, setProgressBars, setUrls, setSuccess, setError) => {
    setError(null);
    setSuccess(null);
    const promises = videos.map((video, index) => {
        return handleUpload(video, storage, db,
            (progress) => {
                const newProgressBars = [...setProgressBars];
                newProgressBars[index] = progress;
                setProgressBars(newProgressBars);
            },
            (url) => {
                const newUrls = [...setUrls];
                newUrls[index] = url;
                setUrls(newUrls);
            }
        );
    });

    try {
        await Promise.all(promises);
        setSuccess("All videos have been uploaded successfully!");
    } catch (error) {
        setError(error);
    }
};
