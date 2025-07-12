'use client'; 

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './Contact.module.css'; 
import { motion } from 'framer-motion';

// Icons from 'react-icons' - 移除了不再使用的 FaPhoneAlt, FaCodepen, FaTwitter, FaInstagram
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // --- [修改] 表单提交流程 ---
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表单默认的提交行为

    // 1. 定义目标邮箱地址
    const recipientEmail = 'lifelix1209@gmail.com';

    // 2. 构建邮件主题
    const subject = `来自网站的联系消息 - ${name}`;

    // 3. 构建邮件正文，包含表单中所有信息
    const body = `您收到一封新的联系表单消息：\n
------------------------------------------\n
姓名 (Name): ${name}\n
邮箱 (Email): ${email}\n
------------------------------------------\n
消息内容 (Message):\n
${message}\n
------------------------------------------`;

    // 4. 创建 mailto 链接，并对主题和正文进行 URL 编码以处理特殊字符和空格
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 5. 通过改变窗口位置来触发邮件客户端
    window.location.href = mailtoLink;
    
    // 提交后清除表单字段（用户从邮件客户端返回后会看到）
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <section className={styles.contactSection}>
          <div className={styles.container}>
            
            <h1 className={styles.lineTitle}>Connect with me</h1>
            
            <div className={styles.contactWrapper}>

              {/* ====== Left Side: Contact Form ====== */}
              <form id="contact-form" className={styles.formHorizontal} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="NAME"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    className={styles.formControl}
                    placeholder="EMAIL"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <textarea
                  className={styles.formControl}
                  rows="8"
                  placeholder="MESSAGE"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                
                <button className={styles.sendButton} type="submit">
                  <FaPaperPlane />
                  <span>SEND</span>
                </button>
              </form>

              {/* ====== Right Side: Direct Contact Info ====== */}
              <div className={styles.directContactContainer}>
                <ul className={styles.contactList}>
                  <li className={styles.listItem}>
                    <FaMapMarkerAlt className={styles.icon} />
                    <span className={styles.contactText}>Hangzhou, Zhejiang</span>
                  </li>
                  
                  {/* --- [修改] 邮件部分，确保是 mailto 链接 --- */}
                  <li className={styles.listItem}>
                    <FaEnvelope className={styles.icon} />
                    <span className={styles.contactText}>
                      <a href="mailto:lifelix1209@gmail.com" title="Send me an email">lifelix1209@gmail.com</a>
                    </span>
                  </li>
                  
                  {/* --- [已移除] 电话号码部分 --- */}
                </ul>

                <hr className={styles.hr} />
                
                {/* --- [修改] 社交媒体链接列表，只保留 GitHub --- */}
                <ul className={styles.socialMediaList}>
                  <li><a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
                  {/* --- [已移除] CodePen, Twitter, Instagram --- */}
                </ul>
                
                <hr className={styles.hr} />
                
                <div className={styles.copyright}>Welcome to connect</div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default Contact;
