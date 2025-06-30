"use client";

import { Preference } from "@/entities/preferences/lib/model";
import { updatePreferenceMutationKey } from "@/entities/preferences/lib/mutation-key";
import { getPreferenceByUserQueryKey } from "@/entities/preferences/lib/query-key";
import {
  UpdatePreferenceSchema,
  updatePreferenceSchema,
} from "@/entities/preferences/lib/schema";
import { updatePreferenceMutation } from "@/features/preferences/lib/mutation";
import { useClient } from "@/shared/lib/pocketbase/hook";
import Portal from "@/shared/ui/portal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Edit, Sparkles, User, X } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

interface AccountUsernameEditProps {
  preference: Preference;
}

const AccountUsernameEdit = ({ preference }: AccountUsernameEditProps) => {
  const client = useClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(updatePreferenceSchema),
    defaultValues: {
      username: preference.username,
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updatePreferenceMutation(client),
    mutationKey: updatePreferenceMutationKey(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getPreferenceByUserQueryKey(),
      });
    },
  });
  const ref = useRef<HTMLDialogElement>(null);

  const onSubmit = handleSubmit((data: UpdatePreferenceSchema) => {
    ref.current?.close();
    mutateAsync({
      id: preference.id,
      schema: data,
    });
  });

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl border-2 border-indigo-200/30 dark:border-indigo-700/30">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-indigo-500/20">
              <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-gray-900 dark:text-white font-semibold">
              {preference.username}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-6">
            Your unique username for the platform
          </p>
        </div>
        <button
          onClick={() => ref.current?.showModal()}
          className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200"
        >
          <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      {/* Modern glassmorphic modal dialog */}
      <Portal id="portal">
        <dialog
          ref={ref}
          className="modal p-0 backdrop:backdrop-blur-md backdrop:bg-black/30"
        >
          <div
            className="modal-backdrop"
            onClick={() => ref.current?.close()}
          ></div>
          <div
            className="max-w-md w-full mx-4 flex flex-col overflow-hidden p-4 px-6 h-full max-h-[50vh]
                     bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30
                     supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90
                     shadow-2xl rounded-3xl modal-box"
          >
            <div className="flex flex-col flex-1 gap-6">
              {/* Header */}
              <div className="text-center space-y-3">
                <div className="p-4 rounded-2xl bg-indigo-500/20 w-fit mx-auto">
                  <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Edit Username
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Update your unique username for the platform
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="flex flex-col flex-1 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    {...register("username")}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
                    placeholder="Enter username"
                    autoFocus
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                    Username must be 2-20 characters, no spaces or special
                    characters
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-2 mt-auto">
                  <button
                    onClick={onSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isValid || isPending}
                  >
                    <Check className="w-4 h-4" />
                    <span className="font-medium">
                      {isPending ? "Saving..." : "Save Changes"}
                    </span>
                  </button>
                  <button
                    onClick={() => ref.current?.close()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-gray-500/10 dark:hover:bg-gray-600/20 text-gray-700 dark:text-gray-300 transition-all duration-200"
                    disabled={isPending}
                  >
                    <X className="w-4 h-4" />
                    <span className="font-medium">Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </Portal>
    </div>
  );
};

export default AccountUsernameEdit;
