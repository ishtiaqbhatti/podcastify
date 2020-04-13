import { Link } from '../routes'

import slug from '../helpers/slug'

export default class ChannelGrid extends React.Component {
	render() {
		const { channels } = this.props
		return (
			<div className="channels">
				{
					channels.map((channel) => (
						<Link 
							route='channel' 
							params={{
								slug: slug(channel.title),
								id: channel.id
							}} 
							prefetch>
							<a className="channel">
								<img src={ channel.urls.logo_image.original}/>
								<h2>{ channel.title }</h2>
							</a>
						</Link>
					))
				}

				<style jsx>{`					
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
				`}</style>	
			</div>
		)
	}
}