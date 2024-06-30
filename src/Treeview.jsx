import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react'

function Treeview(props) {
  const { width, getSelectedNode } = props;
  const data = [
    { id: 1, type: 'folder', name: 'src', children: [{ id: 2, type: 'folder', name: 'inner', children: [{ id: 6, type: 'file', name: 'innerzz.js', children: [] }] }, { id: 3, type: 'file', name: 'inner2.jsx', children: [] }] },
    { id: 4, type: 'folder', name: 'folder2', children: [{ id: 5, type: 'file', name: 'inner2', children: [] }] },
  ];
  const [collapsed, setCollapsed] = useState([]);

  const renderTree = (nodes) => {
    const handleCollapse = (e, node) => {
      getSelectedNode(node);
      const searchItem = collapsed.find((item) => item.id === node.id)
      e.preventDefault();
      // setCollapsed(node);
      setCollapsed((prev) => {
        if (searchItem?.id === node.id) {
          const filtered = collapsed.filter((item) => item?.id !== node?.id)
          return [...filtered]
        }
        else {
          return [...prev, { id: node.id }];
        }
      })
    }

    return (
      <div>
        {nodes.map((nodeItem) =>
          nodeItem.type === 'folder' ?
            <div>
              <button onClick={(e) => handleCollapse(e, nodeItem)} className='text-md hover:bg-gray-100 w-1/2 text-start pl-2 pr-2 flex items-center justify-start'>
                <span className='pt-[1px]'>{collapsed?.find((item) => item?.id === nodeItem?.id)?.id === nodeItem?.id ? <ChevronDownIcon className='size-6 text-gray-300' /> : <ChevronRightIcon className="size-6 text-gray-300" />}</span>
                <span className='ml-1'>{nodeItem?.name}</span>
              </button>
              {
                collapsed?.find((item) => item?.id === nodeItem?.id)?.id === nodeItem?.id &&
                <div>
                  {nodeItem.children.length !== 0 && <div className='ml-2'>{renderTree(nodeItem.children)}</div>}
                </div>
              }
            </div>
            :
            <button onClick={()=>getSelectedNode(nodeItem)} className='text-md hover:bg-gray-200 w-1/2 text-start pl-2 pr-2 ml-6'>{nodeItem?.name}</button>
        )}
      </div>
    )
  }

  return (
    <div className={`w-[${width}]`}>
      {renderTree(data)}
    </div>
  )
}

export default Treeview
