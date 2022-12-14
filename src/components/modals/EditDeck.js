import React, { useState, useEffect } from "react";

const config = require("../../config");

function Modal({
  isVisibleModal,
  showModal,
  getDataDecks,
  currentDeck,
  updateCurrentDeck,
}) {
  const [state, setState] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      name: e.target.value,
    });
  };

  const sendNewDeck = async (e) => {
    try {
      const RawResponse = await fetch(config.service + "/deck/edit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentDeck._id,
          name: state.name,
        }),
      });
      const response = await RawResponse.json();

      getDataDecks();
      updateCurrentDeck();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"modal " + (isVisibleModal == true ? "showModal" : "")}>
      <div className="modal-content-custom">
        <span onClick={(e) => showModal(false)} className="closeModal noselect">
          &times;
        </span>

        <span className="tittleModal noselect">
          <h5 className="modal-title">Edit Deck</h5>
        </span>

        <div className="mt-4">
          <div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  placeholder=""
                />
              </div>
            </div>
            <div className="modal-footer borderColorModal justify-content-center">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={() => sendNewDeck()}
                type="button"
                className="btn btn-outline-primary"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
