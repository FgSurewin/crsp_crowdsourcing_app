import React from "react";
import { InstructionItem } from "./style";
import { Modal } from "antd";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import {
  firstText_1,
  firstText_2,
  secondSrc,
  secondText,
  thirdSrc,
  thirdText,
} from "./text";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function InstructionModal({ confirmModal, show, hideModal }) {
  return (
    <Modal
      title="Instruction"
      visible={show}
      maskClosable={false}
      keyboard={false}
      closable={false}
      onOk={confirmModal}
      onCancel={hideModal}
      width={700}
    >
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <InstructionItem>
            <div>
              <p>{firstText_1}</p>
              <p>{firstText_2}</p>
            </div>
          </InstructionItem>
        </SwiperSlide>
        <SwiperSlide>
          <InstructionItem>
            <InstructionItem small down>
              <div>
                <p>{secondText}</p>
                <img src={secondSrc} alt="secondSrc" width="500" />
              </div>
            </InstructionItem>
          </InstructionItem>
        </SwiperSlide>
        <SwiperSlide>
          <InstructionItem small down>
            <div>
              <p>{thirdText}</p>
              <img src={thirdSrc} alt="thirdSrc" width="500" />
            </div>
          </InstructionItem>
        </SwiperSlide>
      </Swiper>
    </Modal>
  );
}
