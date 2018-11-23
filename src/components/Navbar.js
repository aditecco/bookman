
/******************
	Navbar
*******************/

import React from 'react';


function Navbar(props) {
	return (
		<header className="header">
			<div
				className="logoContainer"
				onClick={props.onLogoClick}
			>
				<h1 className="logotype">BookMan</h1>
			</div>

			<nav className="mainNav">
			</nav>
		</header>
	);
}

export default Navbar;
