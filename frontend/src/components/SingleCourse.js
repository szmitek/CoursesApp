import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';
import './styles/SingleCourse.css';

const SingleCourse = ({ match }) => {
    const courseId = match.params.id;
    const [course, setCourse] = useState(null);
    const videoRef = useRef(null);
    let hls = null;

    useEffect(() => {
        fetchCourse();
        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, []);

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:7777/courses/${courseId}`);
            console.log('Fetched course:', response.data);
            setCourse(response.data.course);
        } catch (error) {
            console.error('Failed to fetch course:', error);
        }
    };

    const handleVideoClick = (videoUrl) => {
        document.getElementById("url").value = videoUrl;
        playVideo();
    };


    const playVideo = () => {
        const streamBtn = document.getElementById("streamBtn");
        if (streamBtn) {
            streamBtn.click();
        }
    };



    useEffect(() => {
        if (Hls.isSupported()) {
            // HLS is supported, create a new Hls instance and configure it
            const hlsjsConfig = {
                maxBufferSize: 0,
                maxBufferLength: 30,
                startPosition: 0
            };
            hls = new Hls(hlsjsConfig);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // Once the manifest is parsed, start playing the video
                videoRef.current.play();
            });
        }

        // Regular expression pattern for extracting video IDs from the URL
        const rgx = /([a-z0-9]{10})(:?\/|$)/g;

        const stream = async () => {
            if (hls === null) {
                // HLS is not supported, show an alert message
                alert("HLS not supported, please use a modern browser such as Chrome");
                return;
            }

            const rawUrl = document.getElementById("url").value;
            let ids = [];
            let match = null;

            while ((match = rgx.exec(rawUrl))) {
                ids.push(match[1]);
            }

            if (ids.length < 1) {
                // No valid video IDs found in the URL, show an alert message
                alert("Invalid URL");
                return;
            }

            // Extract the video ID from the URL
            const videoId = rawUrl.includes("browse3") ? ids[0] : ids[ids.length - 1];
            let statusLabel = document.getElementById("status");

            console.log(`Video ID is ${videoId}`);
            console.log("Looking for final part...");
            let last = 0;
            let jump = true;

            for (let i = 300; i <= 1000; i++) {
                if (i === 1000) {
                    // Unable to find the last part, show an alert message
                    alert("Error finding the last part");
                    return;
                }

                if (i === 0) i = 1;

                // Construct the URL for the video part
                const url = `https://d13z5uuzt1wkbz.cloudfront.net/${videoId}/HIDDEN4500-${String(i).padStart(5, "0")}.ts`;
                console.log(`Testing ${url}`);
                statusLabel.innerText = `Looking for the final part; Testing ${i}...`;
                try {
                    const resp = await fetch(url, { method: 'HEAD' });
                    if (resp.status === 403) {
                        if (i >= 50 && i % 50 === 0 && jump) {
                            // Adjust the last part to the previous multiple of 50
                            last = i;
                            jump = true;
                            i -= 51;
                            continue;
                        }

                        break;
                    }
                    last = i;
                    jump = false;
                } catch (e) {
                    // Fetch failed, show an alert message
                    alert("Fetch failed, please install a Cross-Origin disabler extension for your browser or check your internet connectivity.");
                    return;
                }
            }

            statusLabel.innerText = "";

            let data = "#EXTM3U\n#EXT-X-PLAYLIST-TYPE:VOD\n#EXT-X-TARGETDURATION:10";
            for (let i = 0; i <= last; i++) {
                // Generate the HLS playlist data
                data += `#EXTINF:10,\nhttps://d13z5uuzt1wkbz.cloudfront.net/${videoId}/HIDDEN4500-${String(i).padStart(5, "0")}.ts\n`
            }

            console.log(data);

            // Load the HLS playlist data and attach it to the video element
            hls.loadSource("data:application/x-mpegURL;base64," + btoa(data));
            hls.attachMedia(videoRef.current);
        };

        const streamBtn = document.getElementById("streamBtn");
        if (streamBtn) {
            streamBtn.addEventListener("click", stream);
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
            if (streamBtn) {
                streamBtn.removeEventListener("click", stream);
            }
        };
    }, []);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="video-container">
                <label>URL:</label>
                <input style={{ width: "300px" }} id="url" placeholder="https://www.skill-capped.com/lol/commentaries/p1qcnwqt75" />
                <button style={{ width: "80px", display: "none" }} id="streamBtn">Stream</button>
                <label style={{ display: "block" }} id="status"></label>
                <video
                    className="video"
                    ref={videoRef}
                    style={{ display: "block", marginTop: "10px" }}
                    height="720"
                    width="1280"
                    id="video"
                    controls
                    autoPlay
                    crossOrigin="anonymous"
                />
            </div>
            <div className="content-container">
                <div className="image-container">
                    <h2>{course.title}</h2>
                    <img src={course.imageURL} alt={course.title} />
                </div>
                <div className="playlist-container">
                    <h3>Playlist:</h3>
                    <ul className="playlist">
                        {course.videos.map((video, index) => (
                            <li key={index}>
                                <button onClick={() => handleVideoClick(video.URL)}>
                                    Title: {video.Title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SingleCourse;
