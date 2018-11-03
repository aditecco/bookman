
/******************
  TagItem
*******************/

// js
import React from 'react';


function TagItem(props) {
	const {
		name,
		count
	} = props;

	return (
		<div className="tagItemContainer">
			<span className="tagItemName">
				{name}
			</span>

			<span className="tagItemCount">
				{count}
			</span>
		</div>
	);
}

export default TagItem;
