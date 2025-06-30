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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, EditIcon, XIcon } from "lucide-react";
import { useState } from "react";
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
  const { mutateAsync } = useMutation({
    mutationFn: updatePreferenceMutation(client),
    mutationKey: updatePreferenceMutationKey(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getPreferenceByUserQueryKey(),
      });
    },
  });

  const onSubmit = handleSubmit((data: UpdatePreferenceSchema) => {
    mutateAsync({
      id: preference.id,
      schema: data,
    });
    setIsEditingUsername(false);
  });
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  return (
    <div className="bg-base-50 rounded-lg p-4 border-2 border-primary/20">
      {!isEditingUsername ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base-content font-medium">
              {preference.username}
            </p>
            <p className="text-sm text-base-content/60 mt-1">
              Your unique username for the platform
            </p>
          </div>
          <button
            onClick={() => setIsEditingUsername(true)}
            className="btn btn-ghost btn-sm gap-2 text-primary hover:text-primary-focus"
          >
            <EditIcon className="w-4 h-4" />
            Edit
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              {...register("username")}
              className="input input-bordered flex-1"
              placeholder="Enter username"
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSubmit}
              className="btn btn-primary btn-sm gap-2"
              disabled={!isValid}
            >
              <CheckIcon className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setIsEditingUsername(false)}
              className="btn btn-ghost btn-sm gap-2"
            >
              <XIcon className="w-4 h-4" />
              Cancel
            </button>
          </div>
          <p className="text-xs text-base-content/60">
            Username must be 2-20 characters, no spaces or special characters
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountUsernameEdit;
