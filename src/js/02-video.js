"use strict";

import VideoPlayer from '@vimeo/player'
import throttle from 'lodash.throttle'

const iframe = document.querySelector('iframe');
const player = new VideoPlayer(iframe);

const STORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay (data) {
    const formData = data.seconds;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const storedTime = JSON.parse(localStorage.getItem(STORAGE_KEY));

player.setCurrentTime(storedTime||0);