import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useInputs from "../hooks/useInputs"
import { MdClose } from "react-icons/md"

const EventForm = ({ onSubmit = (f) => f }) => {
  const { calendarCode } = useParams()
  const [state, handleChange] = useInputs({
    title: {
      value: "",
      validators: [],
      errors: {},
    },
    start: {
      value: moment().format("YYYY-MM-DDTHH:mm"),
      validators: [],
      errors: {},
    },
    end: {
      value: moment(Date.now() + 3600000).format("YYYY-MM-DDTHH:mm"),
      validators: [],
      errors: {},
    },
  })
  const [fileList, setFileList] = useState({})
  const [tags, setTags] = useState([])
  const fileInputEl = useRef(null)
  const tagInputEl = useRef(null)

  const { title, start, end } = state

  const handleOpenFileInput = (e) => {
    e.preventDefault()
    fileInputEl.current.click()
  }

  const handleChangeFileInput = (e) => {
    const { files } = e.target
    if (!files.length) return
    const newFiles = {}
    Array(...files).forEach((file) => {
      newFiles[uuidv4()] = file
    })
    setFileList((oldFileList) => ({ ...oldFileList, ...newFiles }))
  }

  const handleDeleteFile = (id) => {
    setFileList((oldFileList) => {
      const files = { ...oldFileList }
      delete files[id]
      return { ...files }
    })
  }

  const handleAddTag = (t) => {
    if (tags.includes(t)) return
    const newTag = t.replace(/,/g, "")
    setTags((oldTags) => [...oldTags, newTag])
  }

  const handleDeleteTag = (t) => {
    setTags((oldTags) => oldTags.filter((ot) => ot !== t))
  }

  const handleKeyDownTag = (e) => {
    if (e.keyCode === 188 || e.keyCode === 13) {
      e.preventDefault()
      handleAddTag(tagInputEl.current.value)
      tagInputEl.current.value = ""
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title.value)
    formData.append("start", start.value)
    formData.append("end", end.value)
    Object.values(fileList).forEach((file) => {
      formData.append("teacherFile", file)
    })
    tags.forEach((tag) => {
      formData.append("tag", tag)
    })
    formData.append("calendarCode", calendarCode)
    onSubmit(formData)
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">제목</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="ex) Little Bear 흘려듣기"
            value={title.value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="start">시작일자</label>
        <div className="input-wrapper">
          <div className="inputs flex gap-2">
            <input
              type="datetime-local"
              name="start"
              value={start.value}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="end">종료일자</label>
        <div className="input-wrapper">
          <div className="inputs flex gap-2">
            <input
              type="datetime-local"
              name="end"
              value={end.value}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="files">수업자료</label>
        <button
          className="py-2 bg-blue-500 text-white rounded"
          onClick={handleOpenFileInput}
        >
          파일 업로드
        </button>
        <input
          className="hidden"
          type="file"
          name="files"
          id="files"
          multiple
          onChange={handleChangeFileInput}
          ref={fileInputEl}
        />
        <ul className="file-list border border-gray-200 p-4 rounded grid gap-2">
          {!Object.keys(fileList).length && (
            <li className="file-list-item flex items-center justify-between py-1">
              <span className="text-sm">수업자료를 업로드하세요 ✅</span>
            </li>
          )}
          {Object.keys(fileList).map((key) => (
            <li
              className="file-list-item flex items-center justify-between py-1"
              key={key}
            >
              <span>{fileList[key].name}</span>
              <button className="flex" onClick={() => handleDeleteFile(key)}>
                <MdClose size={18} color="red" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-field">
        <label htmlFor="tag"># 태그</label>
        <div className="input-wrapper">
          <input
            type="text"
            name="tag"
            id="tag"
            ref={tagInputEl}
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            onKeyDown={handleKeyDownTag}
          />
        </div>
        <ul className="tags flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="p-2 flex items-center gap-2 bg-gray-100 rounded-md"
            >
              <span className="text-sm text-gray-500">{t}</span>
              <button className="flex" onClick={() => handleDeleteTag(t)}>
                <MdClose color="red" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end gap-2">
        <button className="flex py-2 px-6 rounded-md border border-orange-400 bg-orange-400">
          <span className="font-bold text-white">등록</span>
        </button>
      </div>
    </form>
  )
}

export default EventForm
