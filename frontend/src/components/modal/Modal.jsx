// import { useEffect } from "react"
import Portal from "../Portal"

const Modal = ({ onClose = (f) => f, maskClosable = true, children }) => {
  const onMaskClick = (e) => {
    if (e.currentTarget !== e.target) return
    onClose(e)
  }

  // 모달이 활성화되었을 때, 바닥 페이지가 스크롤되지 않도록 제어
  // useEffect(() => {
  //   document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
  //   return () => {
  //     const scrollY = document.body.style.top
  //     document.body.style.cssText = `position: ""; top: ""`
  //     window.scrollTo(0, parseInt(scrollY || "0") * -1)
  //   }
  // })

  return (
    <Portal elementId="modal-root">
      <div
        className="fixed inset-0 w-full px-4 bg-black bg-opacity-50 z-10 flex items-center justify-center"
        tabIndex="-1"
        onClick={maskClosable ? onMaskClick : null}
      >
        <div
          className="w-full bg-white rounded-md flex flex-col max-w-3xl"
          tabIndex="0"
          style={{ height: "90vh" }}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
