import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string | null;
}

export default function Card({ title, description, imageUrl }: CardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl transition-transform duration-300 hover:scale-[1.03]">
      {imageUrl && (
        <figure className="h-56 relative">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            priority={false} // Tidak prioritas, biarkan 'Hero' yang prioritas
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}