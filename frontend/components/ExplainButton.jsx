import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const ExplainButton = () => {
  const [selectedText, setSelectedText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [openaiKey, setOpenaiKey] = useState('');

  useEffect(() => {
    const fetchOpenAIKey = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/openai-key');
        const data = await response.json();
        setOpenaiKey(data.openai_key);
      } catch (error) {
        console.error('Error fetching OpenAI key:', error);
      }
    };

    fetchOpenAIKey();
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      const currentSelectedText = getSelectedTextFromPage();
      if (currentSelectedText) {
        setSelectedText(currentSelectedText);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handleExplainButtonClick = async () => {
    if (selectedText) {
      try {
        const explanationFromApi = await callOpenAIAPI(selectedText);
        setExplanation(explanationFromApi);
        setShowModal(true);
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
      } finally {
        setSelectedText('');
      }
    } else {
      setShowModal(true);
      setExplanation('');
    }
  };

  const getSelectedTextFromPage = () => {
    const selection = document.getSelection();
    if (selection && !selection.isCollapsed) {
      return selection.toString().trim();
    }
    return null;
  };

  const callOpenAIAPI = async (text) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const apiKey = openaiKey;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": `Explain this to a dungeons and dragons beginner in under 200 words: ${text}`}
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      const output = data.choices[0].message.content;
      return output;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  return (
    <>
      <Draggable>
        <button className="explain-btn" onClick={handleExplainButtonClick}>
          {selectedText ? `Explain ${selectedText} to me` : 'Explain something to me'}
        </button>
      </Draggable>

      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="content-inner">
        <div className="close-wrapper">
          <button className="close-button" onClick={() => setShowModal(false)}>
            &times;
          </button>
        </div>
        {explanation ? (
          <div>{explanation}</div>
        ) : (
          <div>Highlight something you want the wise Wizard to explain!</div>
        )}
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default ExplainButton;
