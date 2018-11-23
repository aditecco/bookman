
/******************
	Navbar
*******************/

import React from 'react';


function Navbar(props) {
	const root = 'Header';

	return (
		<header className={root}>
			<div className={`wrapper ${root}Wrapper`}>
				<div
					className={root + "LogoContainer"}
					onClick={props.onLogoClick}
				>
					<h1 className={root + 'Logo'}>BookMan</h1>
				</div>

				<nav className={root + "MainNav"}>
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
