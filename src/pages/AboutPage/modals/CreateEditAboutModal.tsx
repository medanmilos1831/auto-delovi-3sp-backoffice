import { IModalElementProps } from 'src/context/ModalProvider';
import { Button, Form, Input, Row, Space } from 'antd';
import { API_ROUTES } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiProvider } from '@/context';
import { ABOUT_QUERY_KEY } from '../constants';
import { useNotification } from '@/hooks';

const CreateEditAboutModal = ({
  closeModal,
  elementProps,
}: IModalElementProps) => {
  const { injectedData } = elementProps;
  const { successNotifcation } = useNotification();
  const { id, ...rest } = injectedData.data;
  const [form] = Form.useForm();
  const client = useQueryClient();
  const { post, put } = useApiProvider();
  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return id
        ? put<any>(`${API_ROUTES.PROGRAM.UPDATE}/${id}`, payload)
        : post<any>(API_ROUTES.PROGRAM.CREATE, payload);
    },
    onSuccess() {
      successNotifcation(`Uspešno ste ${id ? 'izmenili' : 'kreirali'} program`);
      client.invalidateQueries({
        queryKey: [ABOUT_QUERY_KEY],
      });
      closeModal();
    },
  });
  return (
    <>
      <Form
        name={'create-edit-program-form'}
        form={form}
        onFinish={(values) => {
          mutate(values);
        }}
        initialValues={rest}
        className="py-2"
      >
        <Form.Item
          label="Naziv Programa"
          name="naziv"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Row justify={'end'} className="mt-2">
          <Space>
            <Button htmlType="submit" type="primary">
              {id ? 'Izmeni' : 'Sačuvaj'}
            </Button>
            <Button danger onClick={closeModal}>
              Odustani
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

export { CreateEditAboutModal };
