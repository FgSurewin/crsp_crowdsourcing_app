import React from "react";
import styled from "styled-components/macro";
import { Modal } from "antd";

const PreviewModalContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const PreviewModalText = styled.strong`
  margin-bottom: 20px;
`;

export default function PreviewModal({
  imgSrc,
  confirmModal,
  show,
  hideModal,
  top = 0,
}) {
  return (
    <Modal
      title="Preview"
      visible={show}
      maskClosable={false}
      keyboard={false}
      closable={false}
      onOk={confirmModal}
      onCancel={hideModal}
      width={700}
      okText="Correct"
      cancelText="No"
      style={{ top }}
    >
      <PreviewModalContainer>
        <PreviewModalText>Is this the street view you want?</PreviewModalText>
        {imgSrc && <img src={imgSrc} alt="Preview" width="500" />}
      </PreviewModalContainer>
    </Modal>
  );
}
