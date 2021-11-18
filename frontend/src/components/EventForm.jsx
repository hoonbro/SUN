import moment from "moment"
import { useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useInputs from "../hooks/useInputs"
import { MdClose } from "react-icons/md"
import fileAPI from "../api/file"

const EventForm = ({ initData, onSubmit = (f) => f, onDelete }) => {
  const { calendarCode } = useParams()
  const [state, handleChange] = useInputs({
    title: {
      value: initData?.title || "",
      validators: [],
      errors: {},
    },
    start: {
      value: moment(initData?.start).format("YYYY-MM-DDTHH:mm"),
      validators: [],
      errors: {},
    },
    end: {
      value: moment(initData?.end || Date.now() + 3600000).format(
        "YYYY-MM-DDTHH:mm"
      ),
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

  const handleChangeFileInput = useCallback(async (e) => {
    const { files } = e.target
    console.log(files)
    if (!files.length) return
    console.log(files[0])
    console.log(files[0].size)
    if (files[0].size > 3000000) {
      console.log("asdfsdf")
      alert("파일 용량 초과")
      return
    }
    const formData = new FormData()
    formData.append("teacherFile", files[0])
    try {
      const { fileId, fileUuid, fileName } = await fileAPI.uploadFile(formData)
      setFileList((prevList) => ({
        ...prevList,
        [fileUuid]: { fileId, fileName },
      }))
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDeleteFile = useCallback(async (e, fileUuid) => {
    e.preventDefault()
    try {
      await fileAPI.deleteFile(fileUuid)
      setFileList((prevList) => {
        const files = { ...prevList }
        delete files[fileUuid]
        return { ...files }
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleAddTag = useCallback(
    (t) => {
      if (tags.includes(t)) return
      const newTag = t.replace(/,/g, "")
      setTags((oldTags) => [...oldTags, newTag])
    },
    [tags]
  )

  const handleDeleteTag = useCallback((t) => {
    setTags((oldTags) => oldTags.filter((ot) => ot !== t))
  }, [])

  const handleKeyDownTag = useCallback(
    (e) => {
      if (e.keyCode === 188 || e.keyCode === 13) {
        e.preventDefault()
        handleAddTag(tagInputEl.current.value)
        tagInputEl.current.value = ""
      }
    },
    [handleAddTag]
  )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const formData = {
        title: title.value,
        start: start.value,
        end: end.value,
        teacherFileList: Object.keys(fileList),
        tag: [...tags],
        calendarCode: calendarCode,
      }
      onSubmit(formData)
    },
    [title, start, end, fileList, tags, calendarCode, onSubmit]
  )

  const handleDeleteEvent = useCallback(
    (e) => {
      e.preventDefault()
      const ok = window.confirm("과제를 삭제하실건가요?")
      if (ok) {
        onDelete()
      }
    },
    [onDelete]
  )

  useEffect(() => {
    if (initData?.teacherFileList && initData.teacherFileList.length) {
      setFileList(
        initData.teacherFileList.reduce((acc, f) => {
          return {
            ...acc,
            [f.fileUuid]: { fileName: f.fileName, fileId: f.fileId },
          }
        }, {})
      )
    }
    if (initData?.tag && initData.tag.length) {
      setTags([...initData.tag])
    }
  }, [initData])

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
        <label htmlFor="files">수업자료 (3MB 이하)</label>
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
              <span className="break-all">{fileList[key].fileName}</span>
              <button
                className="flex"
                onClick={(e) => handleDeleteFile(e, key)}
              >
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
        <button className="flex py-2 px-6 rounded-md border border-blue-500 bg-blue-500">
          <span className="font-medium text-white">확인</span>
        </button>
        {onDelete && (
          <button
            className="flex py-2 px-6 rounded-md border border-red-500 bg-white"
            onClick={handleDeleteEvent}
          >
            <span className="font-medium text-red-500">삭제</span>
          </button>
        )}
      </div>
    </form>
  )
}

export default EventForm
