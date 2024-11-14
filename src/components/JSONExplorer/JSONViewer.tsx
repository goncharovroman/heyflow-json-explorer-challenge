import { ReactElement, Fragment } from 'react'
import { JSONValue } from '../../types'
import styles from './JSONViewer.module.css'
import { v4 as uuidV4 } from 'uuid'

type JSONViewerProps = {
  data: JSONValue
  /** render the JSONViewer inside a container, default is true */
  container?: boolean
  onClick?: (path: string) => void
  path?: string
}

export function JSONViewer({ data, container = true, onClick, path }: JSONViewerProps) {
  const elements: ReactElement[] = []

  if (typeof data === 'string') {
    elements.push(<span>'{data}'</span>)
  }

  if (data === null) {
    elements.push(<span>null</span>)
  }

  if (typeof data === 'boolean' || typeof data === 'number') {
    elements.push(<span>{JSON.stringify(data)}</span>)
  }

  if (Array.isArray(data)) {
    elements.push(
      <>
        [<br />
        <div className={styles.padding}>
          {data.map((value, index) => (
            <Fragment key={uuidV4()}>
              {'{'}
              <div className={styles.padding}>
                <JSONViewer data={value} container={false} path={`${path}[${index}]`} onClick={onClick} />
              </div>
              {'}'}
              {index < data.length - 1 && (
                <>
                  , <br />
                </>
              )}
            </Fragment>
          ))}
        </div>
        ]
      </>
    )
  }

  if (typeof data === 'object' && !Array.isArray(data)) {
    for (const key in data) {
      const value = data[key]
      const newPath = path ? `${path}.${key}` : key
      let element

      if (value === null) {
        element = (
          <>
            <span>{key}</span>
            :<JSONViewer data={value} container={false} path={newPath} onClick={onClick} />
          </>
        )
      } else if (typeof value === 'object') {
        element = (
          <>
            <span>{key}:</span>
            {'{'}
            <div className={styles.padding}>
              <JSONViewer data={value} container={false} path={newPath} onClick={onClick} />
            </div>
            {'}'}
          </>
        )
      } else {
        element = (
          <>
            <button type="button" className={styles.key} onClick={() => onClick?.(newPath)}>
              {key}
            </button>
            : <JSONViewer data={value} container={false} path={newPath} onClick={onClick} />
          </>
        )
      }

      elements.push(<div key={uuidV4()}>{element}</div>)
    }
  }

  if (!container) {
    return <>{elements}</>
  }

  return (
    <>
      <div className={styles.header}>Response</div>
      <div className={styles.viewer}>{elements}</div>
    </>
  )
}
