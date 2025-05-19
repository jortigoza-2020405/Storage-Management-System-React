const HomeCard = ({ title, onClick }) => {
	return (
		<div className="home-card" onClick={onClick}>
			<h3>{title}</h3>
		</div>
	)
}

export default HomeCard
