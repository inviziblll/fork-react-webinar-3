import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import { plural, priceFormat } from '../../utils';

import './style.css'; 

function Modal({ onCloseModal, childComponent, modalName}) { 
    return (

            <div className="Modal">
                <div className="Modal-content">                            
                    <div className="Modal-header">
                        <h2>{modalName}</h2>
                        <div className='Controls'><button onClick={onCloseModal}>Закрыть</button></div>
                    </div>
                    {childComponent}
                </div>
            </div>
    );
}
Modal.propTypes = { 
    modalName: PropTypes.string,
    onCloseModal: PropTypes.func.isRequired
};

export default React.memo(Modal);