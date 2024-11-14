import { useState } from 'react'
import { JSONValue } from '../../types'
import { Input } from '../Input'
import { JSONViewer } from './JSONViewer'
import get from 'lodash/get'

type JsonExplorerProps = {
  data: JSONValue
}


export function JsonExplorer({ data }: JsonExplorerProps) {
  const [selectedPath, setSelectedPath] = useState<string>()
  const [selectedValue, setSelectedValue] = useState<string>()

  const handlePathClick = (path: string) => {
    setSelectedPath(path)
    setSelectedValue(getValue(data, path))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPath(e.target.value)
    setSelectedValue(getValue(data, e.target.value))
  }

  return (
    <div>
      <Input label="Property" hint={selectedValue} value={selectedPath} onChange={handleChange} />
      <JSONViewer data={data} onClick={handlePathClick} />
    </div>
  )
}


// normalize the value to be a string or undefined
function getValue(data: JSONValue, path: string) {
  const value = get(data, path);
  if (typeof value === 'object' && value !== null) return undefined;
  return typeof value === 'string' ? value : JSON.stringify(value);
}