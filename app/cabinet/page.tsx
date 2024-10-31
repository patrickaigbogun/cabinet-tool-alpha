'use client';

import { useCallback, useState } from "react";





export default function CabinetPage() {
	const [isDragging, setIsDragging] = useState(false);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => setIsDragging(false);

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		console.log('Dropped files');
		
	};

	const handleClick = useCallback(() => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.multiple = true;
		fileInput.onchange = (e) => {
			const target = e.target as HTMLInputElement;
			try {
				if (target.files) {
					console.log('Selected files:', target.files);
				}

			} catch (error) {
				console.log(error)
			}

		};
		fileInput.click();
	}, []);


  return (
    <div
			id="drop-target"
			className={` ${ isDragging ? 'border-purple-400 bg-purple-950/10 animate-pulse duration-75' : 'border-gray-400'}, 'flex items-center justify-center border-2 border-dashed rounded-lg p-4 font-bold text-center h-72' `}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleClick}
		>
			<p className="text-base">
				Drag and drop files here or click to upload
			</p>

		</div>
  )
}
