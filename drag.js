/**
 * A handler for creating a draggable element.
 * 
 * Code adapted from:
 * https://www.kirupa.com/html5/drag.htm
 */
function makeDraggable(container, element, onDragX = (xPos, e) => e.style.transform = `translateX(${xPos}px)`, onDragY = (yPos, e) => e.style.transform = `translateY(${yPos}px)`) {
	let active = false;

	const current = {
		x: 0,
		y: 0
	};

	const initial = {
		x: 0,
		y: 0
	}

	const offset = {
		x: 0,
		y: 0
	}

	container.addEventListener("touchstart", dragStart, false);
	container.addEventListener("touchend", dragEnd, false);
	container.addEventListener("touchmove", drag, false);

	container.addEventListener("mousedown", dragStart, false);
	container.addEventListener("mouseup", dragEnd, false);
	container.addEventListener("mousemove", drag, false);

	function dragStart(e) {
		switch(e.type) {
			case "touchstart":
				initial.x = e.touches[0].clientX - offset.x;
				initial.y = e.touches[0].clientY - offset.y;
				break;

			default:
				initial.x = e.clientX - offset.x;
				initial.y = e.clientY - offset.y;
				break;
		}

		if (e.target === element)
			active = true;
	}

	function dragEnd(e) {
		initial.x = current.x;
		initial.y = current.y;

		active = false;
	}

	function drag(e) {
		if (active) {
			e.preventDevault();

			switch(e.type) {
				case "touchmove":
					current.x = e.touches[0].clientX - initial.x;
					current.y = e.touches[0].clientY - initial.y;
					break;

				default:
					current.x = e.clientX - initial.x;
					current.y = e.clientY - initial.y;
					break;
			}

			offset.x = current.x;
			offset.y = current.y;
		}

		onDragX(current.x, element);
		onDragY(current.y, element);
	}

	return {};
}
