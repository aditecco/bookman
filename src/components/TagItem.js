
/******************
  TagItem
*******************/

// js
import React from 'react';


function TagItem(props) {
	const {
		name,
		count,
		onClick
	} = props;

	return (
		<a
			href="#"
			className="tagItem"
			onClick={onClick}
		>
			<div className="tagItemContainer">
				<span className="tagItemName">
					{name}
				</span>

				<span className="tagItemCount">
					{
						count !== null || undefined ?
						` (${count})`
						:
						null
					}
				</span>
			</div>
		</a>
	);
}

export default TagItem;
