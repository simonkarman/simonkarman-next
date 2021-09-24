import type {
  NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType,
} from 'next';
import { IProjectFields } from '../../@types/generated/contentful';
import { contentful } from '../../hooks/contentful';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await contentful().getEntries<IProjectFields>('project')).items
    .map((project) => project.fields)
    .map((project) => ({ params: { name: project.name } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<IProjectFields> = async (context) => {
  const name = context.params?.name as string;
  const entries = await contentful().getEntries<IProjectFields>({ content_type: 'project', 'fields.name': name });
  const item = entries.items[0];
  return {
    props: item.fields,
  };
};

type ProjectPageProps = InferGetStaticPropsType<typeof getStaticProps>;
const ProjectPage: NextPage<ProjectPageProps> = (props: ProjectPageProps) => {
  const {
    name, title, description, image,
  } = props;
  return (
    <>
      <h1>
        {title}
      </h1>
      <p>
        {description}
      </p>
      <img src={image.fields.file.url} alt="project" width="400" />
      <p>
        <a href={`https://www.simonkarman.nl/projects/${name}`}>Read more...</a>
      </p>
    </>
  );
};

export default ProjectPage;
