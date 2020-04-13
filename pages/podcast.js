export default class extends React.Component {
	static async getInitialProps({ query }) {
		const idPodcast = query.id
		const reqPodcast = await fetch(`https://api.audioboom.com/audio_clips/${idPodcast}.mp3`)
		const dataPodcast = await reqPodcast.json()
		const podcast = dataPodcast.body.audio_clip
		return {
			podcast
		}
	}

	render() {
		const { podcast } = this.props
		console.log(podcast)
		return (
			<div className='container'>
				<div className='toolbar'>
					<a href='https://gotoback.com'>&lt; Volver</a>
				</div>
				<div className='cover-wrapper'>
					<img src={ podcast.urls.image }/>
				</div>
				<div className='info-wrapper'>
					<h1>{ podcast.title }</h1>
					<h2 className='channel'>{ podcast.channel.title }</h2>
					<audio
						src={ podcast.urls.high_mp3 }
						controls={true}
						preload='auto'
						>
						Audio not supported!!!
					</audio>
				</div>
				<style jsx global>{`
					body {
						margin: 0;
						font-family: sans-serif;
					}
				`}</style>
				<style jsx>{`
					.container {
						background: #8756ca;
						width: 100%;
						height: 100vh;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						color: white;
					}

					.toolbar {
						padding: 25px 15px;
					}
					a{						
						text-decoration: none;
						color: rgba(255, 255, 255, .7);
					}
					a:hover {
						color: white;						
					}

					.cover-wrapper {
						padding: 35px;
						box-sizing: border-box;
					}
					img {
						width: 100%;
					}

					.info-wrapper {
						background: rgba(0, 0, 0, .3);
						padding: 16px 15px;
					}
					h1 {
						font-size: 18px;
						text-align: center;
					}
					.channel {
						text-align: center;
						font-size: 13px;
					}
				`}</style>
			</div>			
		)
	}
}