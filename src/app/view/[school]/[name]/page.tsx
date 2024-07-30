import Header from "@/components/header";
import Footer from "@/components/footer";
import TeacherProfilePreview from "@/components/view/TeacherProfilePreview";
import ShowReviews from "@/components/view/ShowReviews";
import NewReview from "@/components/view/NewReview";
import type { APIResponse } from "@/types/api";
import type { Teacher } from "@prisma/client";

import { useEffect, useState } from "react";

export const metadata = {
  title: "View teacher reviews",
};

export default function ViewTeacherReviews({
  params,
}: {
  params: { school: string; name: string };
}) {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { school, name } = params;

  useEffect(() => {
    name &&
      school &&
      fetch(`/api/teacher/find?name=${name}&school=${school}`)
        .then((r) => r.json())
        .then((t: APIResponse<Teacher>) => {
          setLoading(false);
          if (!t.success) {
            console.error(
              "An error occurred trying to get teacher information!",
              t.message
            );
            return;
          }
          setTeacher(t.data);
        });
  }, [name, school]);

  if (loading) {
    return (
      <>
        <Header />
        <h1 className="mx-auto text-center text-xl p-5">
          Loading data, please wait...
        </h1>
      </>
    );
  }

  if (!teacher) {
    return (
      <>
        <Header />
        <h1 className="mx-auto text-center text-3xl p-5">
          The teacher you tried to search for doesn&apos;t exist.
        </h1>
        <p className="mx-auto text-center text-xl p-5">
          If you believe this is an error, please contact support.
        </p>
      </>
    );
  }

  return (
    <>
      <Header />
      <TeacherProfilePreview teacher={teacher} button={false} />
      <NewReview teacherId={teacher.id} />
      <ShowReviews teacherId={teacher.id} />
      <Footer />
    </>
  );
}
