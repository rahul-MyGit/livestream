'use client'

interface VideoProp {
    hostName: string,
    hostIdentity: string
}

import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react'
import { connect } from 'http2'
import { ConnectionState, Track } from 'livekit-client'
import React from 'react'
import { OfflineVideo } from './OfflineVideo'
import { LoadingVideo } from './LoadingVideo'
import LiveVideo from './LiveVideo'

const VIdeo = ({ hostName, hostIdentity }: VideoProp) => {
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity)

    let content;

    if(!participant && connectionState === ConnectionState.Connected){
        content = <OfflineVideo name={hostName}/>
    }else if(!participant || tracks.length === 0){
        content = <LoadingVideo label={connectionState}/>
    } else {
        content = <LiveVideo participant={participant}/>
    }
    return (
        <div className='aspect-video border-b group relative'>
            {content}
        </div>
    )
}

export default VIdeo