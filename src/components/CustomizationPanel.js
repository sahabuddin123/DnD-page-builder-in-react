import React from 'react';
import { MdSave } from 'react-icons/md';

const CustomizationPanel = ({ elements, setElements, setEditIndex, editIndex }) => {

  const TextType = () => {

    const handleSave = (e) => {
      e.preventDefault();
      const inputValue = e.target.text.value
      const updatedElements = [...elements];
      updatedElements[editIndex].content = inputValue;
      setElements(updatedElements);
    }

    return <form onSubmit={handleSave} action='' style={{ width: '100%' }}>
      <input
        className=''
        type="text"
        style={{ height: 30, marginBottom: 5, width: '100%', borderRadius: 5 }}
        name='text'
        defaultValue={elements[editIndex]?.content ?? 'Header Text'}
        placeholder={`Enter ${elements[editIndex]?.type} content`}
      />
      <button style={{ textAlign: 'center', width: '100%' }} type='submit'><MdSave /> Update</button>
    </form>
  }

  return (
    <div style={{ border: '1px solid #ccc', width: '250px' }}>
      <h3 style={{ background: '#000', color: 'white', padding: 5 }}>Change Element Content and Style</h3>
      <div style={{ padding: '10px', width: 'auto' }}>
        {
          (elements.length && elements[editIndex]?.type === "text-heading") && <TextType />
        }
      </div>
      {/* <input type="text" placeholder="Edit Text" style={{ width: '100%', marginBottom: '10px' }} />
      <input type="text" placeholder="Edit Image URL" style={{ width: '100%', marginBottom: '10px' }} /> */}
    </div>
  );
};

export default CustomizationPanel;
