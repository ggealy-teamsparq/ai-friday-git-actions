"use client";

import Image from "next/image";
import { useId, useRef } from "react";

export default function WelcomeStar({ assetPath }: { assetPath: string }) {
  const titleId = useId();
  const starRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  }

  return (
    <>
      <button
        ref={starRef}
        type="button"
        aria-label="Show welcome message"
        onClick={openDialog}
        className="shrink-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F36937] sm:mr-[100px]"
      >
        <Image
          className="h-[94px] w-24 sm:h-[142px] sm:w-[145px]"
          src={`${assetPath}/star.svg`}
          alt=""
          width={145}
          height={142}
        />
      </button>
      {/* Escape and the Close button both fire "close", which returns focus to the star. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => starRef.current?.focus()}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl bg-white p-8 text-black shadow-xl backdrop:bg-black/50 dark:border dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
      >
        <h2 id={titleId} className="text-2xl font-semibold tracking-tight">
          Welcome to AI Friday
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center rounded-full border border-solid border-black/[.08] px-5 font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-[158px]"
        >
          Close
        </button>
      </dialog>
    </>
  );
}
