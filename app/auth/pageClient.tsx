"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuthActions } from "../hooks/useAuthActions";
import { useTranslationContext } from "../i18n/TranslationProvider";
import styles from "../styles/Auth.module.scss";
import { LoginFormData, createLoginSchema } from "./schemas";

const AuthClient: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuthActions();
  const { t } = useTranslationContext();

  const loginSchema = createLoginSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    await login(data.phoneNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("auth.login.title")}</h1>
          <p className={styles.subtitle}>{t("auth.login.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label={t("auth.login.phoneNumber.label")}
            type="tel"
            placeholder={t("auth.login.phoneNumber.placeholder")}
            error={errors.phoneNumber?.message}
            helperText={t("auth.login.phoneNumber.helperText")}
            {...register("phoneNumber")}
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button
            type="submit"
            isLoading={isLoading}
            className={styles.submitButton}
          >
            {t("auth.login.button")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthClient;
