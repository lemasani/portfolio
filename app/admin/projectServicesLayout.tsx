import React from 'react'

interface ButtonProps {
  className?: string
  text: string
  onClick: () => void
}

interface ProjectServicesLayoutProps {
  sectionName: string
  button?: ButtonProps
  children: React.ReactNode[]
}

const ProjectServicesLayout: React.FC<ProjectServicesLayoutProps> = ({ sectionName, button, children }) => {
  return (
    <section className='min-h-screen  p-10  '>
      <div className='top-bar flex flex-row justify-between items-center'>
        <h2 className='text-2xl font-bold'>{sectionName}</h2>
        <button className={button?.className} onClick={button?.onClick}>
          {button?.text}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {children}
      </div>
    </section>
  )
}

export default ProjectServicesLayout