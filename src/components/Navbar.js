
/******************
	Navbar
*******************/

import React from 'react';
import PillButton from './PillButton';


function Navbar(props) {
	const root = 'Header';
	const debug = true;

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
					{
						debug ?
						<PillButton
							href='#'
							label='Reset'
							onClick={
								() => {
									localStorage.clear();
									window.location.reload();
									console.clear();
									console.info('App resetted.');
								}
							}
						/>
						:
						''
					}
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
