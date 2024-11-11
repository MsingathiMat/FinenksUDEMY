import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MttArrowText = ({ title, action, identifier, link, className }: { title: React.ReactNode, action?: (identifier: string) => void, link?: string, identifier?: string, className?: string }) => {
  return (
    <>
      {
        link ? (
          <Link href={link} className="group mtt-center !justify-between w-full hover:cursor-pointer">
            <p className={cn('group-hover:no-underline group-hover:text-Pri underline text-PriLighter text-[15px]', className)}>
              {title}
            </p>
            <ArrowRight size={18} className=' text-PriLighter group-hover:text-Pri' />
          </Link>
        ) : action ? (
          <div onClick={() => { action(identifier ? identifier : "") }} className="group mtt-center !justify-between w-full text-pri_2 hover:cursor-pointer">
            <p className="text-PriLighter group-hover:text-Pri">
              {title}
            </p>
            <ArrowRight size={18} className=' text-PriLighter group-hover:text-Pri' />
          </div>
        ) : (
          <div className="group mtt-center !justify-between w-full">
            <p className="text-[13px] text-MtPopSec20">
              {title}
            </p>
          </div>
        )
      }
    </>
  );
}

export default MttArrowText;
