import React, { useState } from 'react';
import '../assets/css/PageBuilder.css';

const Element = ({ type, content, onDelete, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(content);
  
  const [imageSettings, setImageSettings] = useState({
    url: "https://via.placeholder.com/250",
    width: 250,
    height: 250,
  });

  const handleSave = () => {
    onSave(inputValue);
    setEditing(false);
  };

  const handleImageChange = () => {
    const newImageUrl = prompt('Enter image URL:', imageSettings.url);
    if (newImageUrl) {
      setImageSettings({ ...imageSettings, url: newImageUrl });
    }
  };

  const handleSizeChange = () => {
    const width = parseInt(prompt('Enter width:', imageSettings.width));
    const height = parseInt(prompt('Enter height:', imageSettings.height));
    if (!isNaN(width) && !isNaN(height)) {
      setImageSettings({ ...imageSettings, width, height });
    }
  };

  return (
    <div className="element">
      {editing ? (
        <div>
          {type === 'image' ? (
            <>
              <img
                src={imageSettings.url}
                alt="Editable"
                style={{
                  width: `${imageSettings.width}px`,
                  height: `${imageSettings.height}px`,
                  cursor: 'pointer',
                }}
                onClick={handleImageChange}
              />
              <div>
                <input
                  type="number"
                  value={imageSettings.width}
                  onChange={(e) => setImageSettings({ ...imageSettings, width: e.target.value })}
                />
                <input
                  type="number"
                  value={imageSettings.height}
                  onChange={(e) => setImageSettings({ ...imageSettings, height: e.target.value })}
                />
                <button onClick={handleSizeChange}>Apply</button>
              </div>
            </>
          ) : (
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${type} content`}
              />
            </div>
          )}
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          {type === 'image' ? (
            <img
              src={imageSettings.url}
              alt="Editable"
              style={{
                width: `${imageSettings.width}px`,
                height: `${imageSettings.height}px`,
                cursor: 'pointer',
              }}
              onClick={() => setEditing(true)}
            />
          ) : (
            <div onClick={() => setEditing(true)}>{content || (type === 'text-heading' ? 'Header Text' : 'Editable Content')}</div>
          )}
          <div>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Element;
