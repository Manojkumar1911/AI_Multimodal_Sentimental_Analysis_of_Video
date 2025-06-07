"use server";

import { redirect } from 'next/navigation';
import CodeExamples from "~/components/client/code-examples";
import CopyButton from "~/components/client/copy-button";
import { Inference } from "~/components/client/Inference";
import { SignOutButton } from "~/components/client/signout";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function HomePage() {
  const session = await auth();

  // Server-side check: if no session, redirect to login
  if (!session) {
    redirect('/login');
  }

  // Fetch quota only if authenticated
  const quota = await db.apiQuota.findUniqueOrThrow({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <nav className="flex h-16 items-center justify-between border-b border-slate-200 bg-gradient-to-r from-white via-blue-50 to-white px-6 lg:px-12 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 text-white shadow-md">
            SA
          </div>
          <span className="text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Sentiment Analysis</span>
        </div>

        <SignOutButton />
      </nav>

      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] w-full flex-col gap-8 p-6 lg:p-12 max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="rounded-2xl bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 shadow-lg ring-1 ring-slate-100 transition-all duration-300 hover:shadow-xl hover:ring-slate-200">
            <Inference quota={{ secretKey: quota.secretKey }} />
          </div>
          
          <div className="flex h-fit w-full flex-col gap-8">
            <h2 className="text-xl font-medium bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">API</h2>
            <div className="group rounded-2xl bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-indigo-200">
              <span className="text-base font-medium text-slate-700">Secret key</span>
              <span className="mt-2 block text-sm text-slate-500">
                This key should be used when calling our API, to authorize your
                request. It can not be shared publicly, and needs to be kept
                secret.
              </span>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium text-slate-700">Key</span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="w-full max-w-[300px] overflow-x-auto rounded-md border border-slate-200 bg-gradient-to-r from-white to-indigo-50 px-4 py-2 text-sm text-slate-600 shadow-sm transition-all duration-300 group-hover:border-indigo-300 sm:w-auto">
                    {quota.secretKey}
                  </span>
                  <CopyButton text={quota.secretKey} />
                </div>
              </div>
            </div>

            <div className="group rounded-2xl bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-indigo-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-base font-medium text-slate-700">Monthly quota</span>
                <span className="text-sm text-slate-500">
                  {quota.requestsUsed} / {quota.maxRequests} requests
                </span>
              </div>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gradient-to-r from-slate-100 to-indigo-100">
                <div
                  style={{
                    width: (quota.requestsUsed / quota.maxRequests) * 100 + "%",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 shadow-sm transition-all duration-300"
                ></div>
              </div>
            </div>
            <div className="group rounded-2xl bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-indigo-200">
              <CodeExamples />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 