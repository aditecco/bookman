/* ---------------------------------
Admin
--------------------------------- */

import React, { ReactElement, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Modal, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { BookmarkType, TagType } from "../../../types/bookman";
import PillButton from "../../../components/PillButton/PillButton";
import BaseButton from "../../../components/BaseButton/BaseButton";
import TabSwitcher from "../../../components/TabSwitcher/TabSwitcher";

interface IOwnProps {}

/**
 *
 * pagination
 * ellipsis
 * multiple selection & mass operations
 * fixed headers
 * filter & sort
 * loading
 * click to copy elided cell values
 *
 */

export default function Admin(props: IOwnProps): ReactElement {
  const INITIAL_MODAL = { visible: false, content: null };

  const { bookmarks, tags } = useSelector((state: RootState) => state);
  const [showModal, setShowModal] = useState(INITIAL_MODAL);

  return (
    <Layout root="Admin">
      <Modal
        title="Basic Modal"
        visible={showModal.visible}
        onOk={_ => setShowModal(INITIAL_MODAL)}
        // onCancel={null}
      >
        {showModal.content}
      </Modal>

      <TabSwitcher
        tabs={[
          // bookmarks table
          {
            name: "Bookmarks",
            content: (
              <Table
                sticky
                size="middle"
                dataSource={bookmarks.map((bookmark: BookmarkType) => ({
                  key: bookmark._key,
                  ...bookmark,
                }))}
                columns={[
                  {
                    title: "URL",
                    dataIndex: "url",
                    key: "url",
                    ellipsis: {
                      showTitle: false,
                    },
                    render: url => (
                      <Tooltip placement="topLeft" title={url}>
                        {url}
                      </Tooltip>
                    ),
                  },
                  {
                    title: "Tags",
                    dataIndex: "tags",
                    key: "tags",
                    render(tags: TagType[]) {
                      return tags?.map((tag, i) => (
                        <PillButton
                          label={tag.value}
                          style={
                            i !== tags.length - 1 ? { marginRight: 6 } : {}
                          }
                          key={tag.id}
                        />
                      ));
                    },
                  },
                  {
                    title: "Timestamp",
                    dataIndex: "timestamp",
                    key: "timestamp",
                    render(timestamp) {
                      return new Date(timestamp).toLocaleString();
                    },
                  },
                  {
                    title: "ID",
                    dataIndex: "id",
                    key: "id",
                    ellipsis: {
                      showTitle: false,
                    },
                    render: id => (
                      <Tooltip placement="topLeft" title={id}>
                        {id}
                      </Tooltip>
                    ),
                  },
                  {
                    title: "Actions",
                    key: "actions",
                    render(_, record) {
                      return (
                        <BaseButton
                          label="action"
                          className="button--outline"
                          onClick={_ => window.alert(record.id)}
                        />
                      );
                    },
                  },
                ]}
              />
            ),
          },

          // tags table
          {
            name: "Tags",
            content: (
              <Table
                size="middle"
                dataSource={tags.map((tag: TagType) => ({
                  key: tag._key,
                  ...tag,
                }))}
                columns={[
                  {
                    title: "Value",
                    dataIndex: "value",
                    key: "value",
                  },
                  {
                    title: "Associated bookmarks",
                    dataIndex: "bookmarks",
                    key: "bookmarks",
                    render(bookmarks) {
                      const bookmarkArray = Object.keys(bookmarks);
                      const content = bookmarkArray.map((key, i) => {
                        const l = Object.keys(bookmarks).length;

                        return (
                          <a
                            style={i !== l - 1 ? { marginRight: 6 } : {}}
                            href="#"
                            key={i}
                            onClick={null}
                          >
                            {i !== l - 1 ? `${key}, ` : key}
                          </a>
                        );
                      });

                      return (
                        <BaseButton
                          label={String(bookmarkArray.length)}
                          className="button--naked"
                          onClick={_ =>
                            setShowModal({ visible: true, content })
                          }
                        />
                      );
                    },
                  },
                  {
                    title: "Timestamp",
                    dataIndex: "timestamp",
                    key: "timestamp",
                    render(timestamp) {
                      return new Date(timestamp).toLocaleString();
                    },
                  },
                  {
                    title: "ID",
                    dataIndex: "id",
                    key: "id",
                    ellipsis: {
                      showTitle: false,
                    },
                    render: id => (
                      <Tooltip placement="topLeft" title={id}>
                        {id}
                      </Tooltip>
                    ),
                  },
                  {
                    title: "Actions",
                    key: "actions",
                    render(_, record) {
                      return (
                        <BaseButton
                          label="action"
                          className="button--outline"
                          onClick={_ =>
                            setShowModal({ visible: true, content: record.id })
                          }
                        />
                      );
                    },
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </Layout>
  );
}

/*



{
      _key: '-MEKVsxH7pD-K7UX97us',
      createdBy: 'QtiwtZ2mZ0esaCwrnAFTQFLGEPe2',
      id: 'a2b25e05-cfcf-40eb-8de2-5de932457526',
      tagKeys: [
        '-MEKVsxINVVKjT9O_Ox_',
        '-MEKVsxINVVKjT9O_Oxa'
      ],
      tags: [
        {
          _key: '-MEKVsxINVVKjT9O_Ox_',
          bookmarks: {
            '-MEKVsxH7pD-K7UX97us': true
          },
          createdBy: 'QtiwtZ2mZ0esaCwrnAFTQFLGEPe2',
          id: '0a5ad423-d70e-4f9b-bea6-d12f0131b7a4',
          timestamp: 1597015035806,
          value: 'firebase'
        },
        {
          _key: '-MEKVsxINVVKjT9O_Oxa',
          bookmarks: {
            '-MEKVsxH7pD-K7UX97us': true,
            '-MEZumL0NW038yvhyQ64': true,
            '-MEZwhiuw0dT6cbZWiwC': true,
            '-MEZyKK-1Ey-KVlVF53Y': true,
            '-MEaehyRMUfdZjIKUl7x': true,
            '-MEe-26He4H81kfyVqHv': true,
            '-MEg3GARpjnyAozH23An': true,
            '-MFfIm5qNyxcgmKez7hR': true,
            '-MFk89cvS6GQhEsVP7yu': true,
            '-MFwoDP4MJeaNpBQi37_': true,
            '-MG7nBa6trRXV1xXWXPx': true,
            '-MG7oAPDAzCQv47k0QTG': true,
            '-MGdOLiqBOZBnj-bu_YV': true,
            '-MGhj7M3-WORezcvvvqw': true,
            '-MGhjMQSlt5nWil5l6nd': true,
            '-MGhj_IdDxQ3nC_WQTAw': true,
            '-MGmYPIUEkHqJU020hNc': true,
            '-MGn_G4HgE3sp5f7n7xy': true,
            '-MHN_P7r7uSrX3PvG2BX': true,
            '-MHjz7yH37TLlJ4Fg23e': true,
            '-MHjzHand0Wf39f_PE0W': true,
            '-MHk7lp7h0eVABrC6ekn': true,
            '-MIWF8Ho-MOncxYOt5K6': true
          },
          createdBy: 'QtiwtZ2mZ0esaCwrnAFTQFLGEPe2',
          id: '15d3391a-2ff9-4b31-99e9-6ab44cd5c14a',
          timestamp: 1597015035806,
          value: 'how-to'
        }
      ],
      timestamp: 1597015035806,
      url: 'https://stackoverflow.com/questions/39712833/firebase-performance-how-many-children-per-node'
    }







<Table
        dataSource={[
          {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
          },
          {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
          },
        ]}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
          },
        ]}
      />

 */
