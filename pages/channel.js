import Link from 'next/link'
import Error from './_error'

import Layout from '../components/Layout'
import PodcastListWithClick from '../components/PodcastListWithClick'
import PodcastPlayer from '../components/PodcastPlayer'

export default class extends React.Component {
	state = {
		openPodcast: null
	}

	static async getInitialProps({ query, res }) {
		let idChannel = query.id

		try {
			let [reqChannel, reqSeries, reqAudios] = await Promise.all([
				fetch(`https://api.audioboom.com/channels/${idChannel}`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
			])

			if(reqChannel.status >= 400) {
				res.statusCode = reqChannel.status
				return {
					channel: null,
					audioClips: null,
					series: null,
					statusCode: reqChannel.status
				}
			}

			let dataChannel = await reqChannel.json()
			let channel = dataChannel.body.channel
			
			let dataAudios = await reqAudios.json()
			let audioClips = dataAudios.body.audio_clips

			let dataSeries = await reqSeries.json()
			let series = dataSeries.body.channels

			return { 
				channel,
				audioClips,
				series,
				statusCode: 200
			}
		} catch(e) {
			return {
				channel: null,
				audioClips: null,
				series: null,
				statusCode: 503
			}
		}
	}

	openPodcast = (event, podcast) => {
		event.preventDefault()
		this.setState({
			openPodcast: podcast
		})
	}

	closePodcast = (event) => {
		event.preventDefault()
		this.setState({
			openPodcast: null
		})
	}

	render() {
		const { channel, audioClips, series, statusCode } = this.props
		const { openPodcast } = this.state		
		if(statusCode !== 200) {
			return <Error statusCode={ statusCode }>Error loading data.</Error>
		}		
		return (
			<Layout title={ channel.title }>
				{
					openPodcast && 
					<div className='modal'>
						<PodcastPlayer clip={ openPodcast } onClose={ this.closePodcast }/>
					</div>
				}
				<h1>{ channel.title }</h1>
				<h2>Series</h2>
				{
					series.map((serie) => (
						<div>{ serie.title }
						</div>
					))
				}
				<h2>Ultimos Podcasts</h2>
				<PodcastListWithClick 
					podcasts={ audioClips }
					onClickPodcast={ this.openPodcast }/>
				<style jsx>{`
					a {
						display: block;
					}				
					.channels {
						display: grid;
						grid-gap: 15px;
						padding: 15px;
						grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
					}
					.channel {
						display: block;						
						border-radius: 3px;
						box-shadow: 0px 2px 6px rgba(0, 0, 0, .15);
						margin-bottom: .5em;
					}
					.channel img {
						width: 100%;
					}
					h2 {
						font-size: 1rem;
						text-align: center;
					}
					.modal {
						position: fixed;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						z-index: 999;
					}
				`}</style>
			</Layout>
		)
	}
}