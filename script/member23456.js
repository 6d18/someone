document.addEventListener('DOMContentLoaded', function() {
    let currentMember = null;
    let audioPlayer = document.getElementById('audio-player');

const songs = [
    'intel/ddd.mp3', // 1
];

function showMember(member) {
    const memberInfo = {
        'Lte': { 'name': 'Lte', 'image': 'assets/DDDD.jpg', 'description': 'tattooed in reverse', 'songIndex': 4 },
        'Claudia': { 'name': 'Claudia', 'image': 'assets/big.jpg', 'description': 'o_O', 'songIndex': 1 },
        'Novembre': { 'name': 'Novembre', 'image': 'assets/nov.jpg', 'description': 'Uh..', 'songIndex': 3 },
        'CEO': { 'name': 'CEO', 'image': 'assets/ceo.png', 'description': 'love miracle', 'songIndex': 0 },
        'Romance': { 'name': 'Romance', 'image': 'assets/romancee.gif', 'description': 'Love is just a dream', 'songIndex': 2 },
        'Miserable': { 'name': 'Miserable', 'image': 'assets/miserable1.jpg', 'description': 'xman', 'songIndex': 5 }, 
        'Hardline': { 'name': 'Hardline', 'image': 'assets/Hardline.jpg', 'description': 'Point the camera on me, but you won’t see the face', 'songIndex': 6 }, 
        'Pie': { 'name': 'Pierce', 'image': 'assets/pie.png', 'description': 'Pierce-Chan', 'songIndex': 7 }, 
        'Gore': { 'name': 'Gore', 'image': 'assets/poc.jpg', 'description': '', 'songIndex': 8 }, 
        'Kalash': { 'name': 'Kalashnikov', 'image': 'assets/kalash.jpg', 'description': 'humanitys last breath', 'songIndex': 9 } 
    };
 const hardcodedVolume = 0.2; 
    if (audioPlayer) {
        audioPlayer.volume = hardcodedVolume; 
    }
        const info = memberInfo[member];
        if (!info) return;

        const memberDiv = document.getElementById('member-info');
        const selectedElement = document.querySelector(`[onclick="showMember('${member}')"]`);

        if (currentMember) {
            currentMember.classList.remove('selected');
            const previousDot = document.getElementById(`${currentMember.getAttribute('data-member')}-dot`);
            if (previousDot) previousDot.innerHTML = '::';
            stopMusic();
        }

        if (currentMember === selectedElement) {
            currentMember = null;
            memberDiv.innerHTML = '';
            playDefaultSong();
            return;
        }

        if (selectedElement) {
            selectedElement.classList.add('selected');
            selectedElement.setAttribute('data-member', member);
        } else {
            console.warn('Selected element not found for member:', member);
            return;
        }

        document.querySelectorAll('.yellow').forEach(dot => {
            dot.innerHTML = '::';
        });

        const currentDot = document.getElementById(`${member}-dot`);
        if (currentDot) {
            currentDot.innerHTML = '<span style="color: #8a0000; margin-top: -2px;">&bull;</span>';
        }

memberDiv.innerHTML = `
    <img src="${info.image}" class="fade-in" style="width: 120px; height: 120px;" draggable="false">
    <p style="margin-top: 5px; margin-bottom: 0; color: #b90000;">[ ${info.name} ]</p>
    <hr style="border-top: 1px solid #b90000; margin: 3px 0;">
    <p class="glitch" style="margin-top: 5px;">${info.description}</p>
`;


        changeSong(info.songIndex);

        currentMember = selectedElement;
    }

    function playDefaultSong() {
        const defaultSongIndex = songs.length - 1;
        changeSong(defaultSongIndex);
    }

    function changeSong(songIndex) {
        if (!audioPlayer) {
            console.error('Audio player element not found');
            return;
        }

        const songPath = songs[songIndex] || songs[songs.length - 1];
        audioPlayer.src = songPath;
        audioPlayer.play().catch(error => {
            console.error('Error playing song:', error);
        });
    }

    function stopMusic() {
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }
    }

    function removeOverlay() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
            playDefaultSong();
        }
    }

    window.showMember = showMember;
    window.removeOverlay = removeOverlay;
});
