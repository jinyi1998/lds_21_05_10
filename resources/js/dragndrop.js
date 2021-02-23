export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : '',
});

export const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
});

export const getDraggable = (provided, snapshot) => {
    if(typeof provided == 'undefined'){
        return (
          null
        );
    }else{
        return (
            {
                // styles we need to apply on draggables
                ref: provided.innerRef,
                ...provided.draggableProps,
                ...provided.dragHandleProps,
                style: getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                )
            }
        );
    }
}

// cursor: isDragging ? "all-scroll" : "pointer",