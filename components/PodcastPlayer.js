export default class PodcastPlayer extends React.Component {
	render() {
		const { clip, onClose } = this.props
		return (
			<div className='container'>
				<nav className='toolbar'>				
					{
						onClose ?
							<a onClick={ onClose }>&lt; Volver</a>
							:
							<a href='https://dantecalderon.com'>&lt; Volver</a>
					}
				</nav>
				<div className='cover-wrapper'>
					<img src={ clip.urls.image }/>
				</div>
				<div className='info-wrapper'>
					<h1>{ clip.title }</h1>
					<h2 className='channel'>{ clip.channel.title }</h2>
					<audio
						src={ clip.urls.high_mp3 }
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