import React from 'react';

const ImageElement = ({ content, setContent, imageSize, setImageSize, isEditing, onUpdate, element }) => {

    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setImageSize(prevSize => ({
            ...prevSize,
            [name]: value
        }));
    };

    const handleImageClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setContent(reader.result);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const applyImageSize = () => {
        onUpdate({ ...element, content, width: imageSize.width, height: imageSize.height });
    };

    return (
        <>
            <div
                style={{
                    width: imageSize.width,
                    height: imageSize.height,
                    border: '2px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                }}
                onClick={handleImageClick}
            >
                <img
                    src={content || 'https://via.placeholder.com/200'}
                    alt="content"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            </div>
            {isEditing && (
                <div className="size-inputs">
                    <label>
                        Width:
                        <input
                            type="number"
                            name="width"
                            value={imageSize.width}
                            onChange={handleSizeChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        Height:
                        <input
                            type="number"
                            name="height"
                            value={imageSize.height}
                            onChange={handleSizeChange}
                            className="input-field"
                        />
                    </label>
                    <button onClick={applyImageSize} className="icon-button">Apply</button>
                </div>
            )}
        </>
    );
};

export default ImageElement;
